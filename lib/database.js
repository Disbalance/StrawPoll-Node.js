/*--- MySQL Database----*/
var mysql = require('mysql');

var connection;

exports.createConnection = function () {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'poll'
    });
}

exports.addPollDB = function(strawpoll,options,res){
    connection.query('INSERT INTO strawpoll SET ?',strawpoll, function(err, result) {
        var id = result.insertId;
        for (i=0;i<options.option.length;i++) {
            var data = {id_quest :id, option: options.option[i], id_vote: i+1};
            connection.query('INSERT INTO options SET ?',data, function (err, result) {
                console.log(err);
            });
        }
        res.statusCode = 200;
        res.end("http://192.168.0.105:3333/"+String(id));
    });
};

/*Получение данных для заполнения формы голосования*/
exports.getDataDB = function (id,res) {
    var data;
    connection.query('SELECT quest,mult_pass FROM strawpoll WHERE id =' + id, function (error, result, fields) {
        if (result.length == 0){
            res.send('404 Not Found');
            return;
        }
        var quest = result[0].quest;
        var mult_pass = result[0].mult_pass;
        connection.query('SELECT options.option FROM options WHERE id_quest =' + id, function (error, result, fields) {
            var op = [];
            for (i = 0; i < result.length; i++) {
                op[i] = result[i].option;
            };

            var data = [];

            for(i=0;i<op.length;i++){
                var option= op[i];
                var s = "";
                for(j=0;j<option.length;j++){
                    if(Number(option.charAt(j))==0){
                        s+='&nbsp;';
                        console.log(1);
                    }else{
                        s+=option[j];
                    }
                }
                data.push(s);
            }
            if (mult_pass == 0) mult_pass = false;
            else mult_pass = true;
            data = {id: id, quest: quest,mult_pass : mult_pass, options: data};
            res.render('index_vote', data);
        });
   });
};

function addVote(data,res) {
    var vote = data.vote;
    for(i=0;i<data.vote.length;i++) {
        var votes = vote[i];
        var id = data.id_quest;
        var votes = {id_quest:id, vote:votes};
        connection.query('INSERT INTO votes SET ?', votes, function (err, result) {
            res.statusCode = 201;
            res.end('ok');
        });
    }
};

function addIpDB(data,res){
    var ip ='"'+data.ip_adress+'"';
    var id = data.id_quest;
    connection.query('SELECT id_quest FROM users WHERE ip_adress ='+ip, function (error, result) {
        var add = true;
        for(i=0;i<result.length;i++){
            if (data.id_quest == result[i].id_quest) add = false;
        }
        if (add == true) {
            connection.query('INSERT INTO users SET ?', data, function (err, result) {
                addVote(vote,res);
                res.statusCode = 201;
                res.end('Ok');
            });
        }else{
            res.statusCode = 200;
            res.end('Вы уже голосовали за данный вопрос. Пожалуйста перейдите на "Результаты"');
        }

    });
 };

exports.getCheckMultIp = function (data,vote,res) {
    connection.query('SELECT mult_ip FROM strawpoll WHERE id =' + data.id_quest, function (error, result) {
        if (result[0].mult_ip == 0) {
            addIpDB(data, res);
        } else {
            addVote(vote,res);
            res.statusCode = 201;
            res.end('ok');
        }
    });
};


exports.getResultVote = function (id,res){
    var count = 0;
    connection.query('SELECT options.id_vote,options.option FROM options WHERE id_quest ='+id,function(error, result) {
        if (result.length ==0){
            res.statusCode = 203;
            res.end('404 Страница не найдена. Возможно данного вопроса не существует. Проверьте url');
            return;
        }
        var temp = result;
        var rs = [];
        rs[0] = ['', ''];
        for (i = 0; i < temp.length; i++) {
            rs[i + 1] = [];
            var option = temp[i].option;
            rs[i + 1][0] = '' + option + '';
        }
        connection.query('SELECT COUNT( * ) AS cnt, vote FROM votes WHERE votes.id_quest =' + id + ' GROUP BY vote ORDER BY  "cnt"', function (error, result) {
            for (i = 0; i < result.length; i++) {
                if (temp.id_vote == result.vote) {
                    rs[i + 1][1] = result[i].cnt;
                    count += result[i].cnt;
                }
            };
            connection.query('SELECT quest FROM strawpoll where id=' + id, function (error, result) {
                if (count ==0){
                    res.statusCode = 202;
                    res.end('Голосов по данному вопросу: 0. Пожалуйста проголосуйте');
                }
                var s = JSON.stringify({count: count, quest: result[0].quest, votes: rs});
                res.statusCode = 200;
                res.end(s);
            });
        });
    });
};