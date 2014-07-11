var database = require('../lib/database');

exports.post = function(req, res) {
    var temp = "";
req.on('readable', function() {
    temp += req.read();
})
    .on('end', function() {
        temp = JSON.parse(temp);
        parseData(temp,res);
    });
};

function parseData(temp,res){
    var question = temp.quest;
    var option = new Array();
    var option = temp.options;

    if(temp.multi) var multi = 1;
    else var multi = 0;

    if(temp.ip) var ip = 1;
    else var ip = 0;

    var strawpoll = {quest: question, mult_pass: multi, mult_ip: ip};
    var options  = {option: option};


    database.addPollDB(strawpoll,options,res);
};