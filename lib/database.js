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
                console.log(result);
            });
        }
        res.statusCode = 200;
        res.end("http://poll.me:3000/"+String(id));
    });
}

exports.getOptionDB = function getOptionDB() {
    connection.query('SELECT * FROM strawpoll', function (error, result, fields) {
        // Если возникла ошибка выбрасываем исключение
        if (error) {
            throw error;
        }
        // выводим результат
        console.log(fields);
        console.log(result);
    });
}