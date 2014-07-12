var database = require('../lib/database');

exports.post = function(req, res) {
    var temp = "";
    req.on('readable', function() {
        temp += req.read();
    })
        .on('end', function() {
            temp = JSON.parse(temp);
            database.getResultVote(temp.id,res);
        });
};