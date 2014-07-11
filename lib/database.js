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
            var data = {id_quest :id, option: options.option[i]};
            connection.query('INSERT INTO options SET ?',data, function (err, result) {
                console.log(err);
             /*   console.log(result);*/
            });
        }
        res.statusCode = 200;
        res.end("http://192.168.0.105:3333/"+String(id));
    });
};

/*Получение данных для заполнения формы голосования*/
exports.getDataDB = function getDataDB(id,res) {
    var data;
    connection.query('SELECT quest,mult_pass FROM strawpoll WHERE id =' + id, function (error, result, fields) {
        var quest = result[0].quest;
        var mult_pass = result[0].mult_pass;
        connection.query('SELECT options.option FROM options WHERE id_quest =' + id, function (error, result, fields) {
            var op = [];
            for (i = 0; i < result.length; i++) {
                op[i] = result[i].option;
            };
            if (mult_pass == 0) mult_pass = false;
            else mult_pass = true;
            data = {quest: quest,mult_pass : mult_pass, options: op};
            console.log(data);
            res.render('index_vote', data);
        });
   });
};


/*Добавить при нажатии на кнопку 'Vote'*/
/*var data = {id_quest: 3333, ip_adress: req.ip};
database.addIpDB(data);*/


exports.addIpDB = function addIpDB(data){
    console.log(data.id_quest+' '+data.ip_adress);
    connection.query('INSERT INTO users SET ?',data,function(err, result) {
        /*console.log(err);*/
    /*    console.log(result);*/
    });
 }