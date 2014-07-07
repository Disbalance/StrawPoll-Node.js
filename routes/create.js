exports.post = function(req, res) {
    var temp = "";
req.on('readable', function() {
    temp += req.read();
})
    .on('end', function() {
        temp = JSON.parse(temp);
        parseData(temp);
        res.end("ok");
    });

};

function parseData(temp){
    var question = temp.quest;
    var option = new Array();
    var option = temp.options;

    if(temp.multi) var multi = 1;
    else var multi = 0;

    if(temp.ip) var ip = 1;
    else var ip = 0;

    var strawpoll = {quest: question, mult_pass: multi, mult_ip: ip};
    var options  = {option: option};

    addPollDB(strawpoll,options);
}

/*--- MySQL Database----*/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'poll'
});

function addPollDB(strawpoll,options){
    connection.query('INSERT INTO strawpoll SET ?',strawpoll, function(err, result) {
    var id = result.insertId;
    for (i=0;i<options.option.length;i++) {
        var data = {id_quest :id, option: options.option[i]};
        connection.query('INSERT INTO options SET ?',data, function (err, result) {
            console.log(err);
            console.log(result);
        });
    }
 });
}

/*function getOptionDB() {
    connection.query('SELECT * FROM strawpoll', function (error, result, fields) {
        // Если возникла ошибка выбрасываем исключение
        if (error) {
            throw error;
        }
        // выводим результат
        console.log(fields);
        console.log(result);
    });
}*/

