var database = require('../lib/database');

exports.post = function(req, res) {
    var temp = "";
    req.on('readable', function() {
        temp += req.read();
    })
        .on('end', function() {
            temp = JSON.parse(temp);
            parseVote(temp,req,res);
            console.log(temp);
        });
};

function parseVote(data,req,res){
    var id = data.id;
    var options = data.value;
    var ip = {id_quest: id, ip_adress: req.ip};
    database.addIpDB(ip,res);
}