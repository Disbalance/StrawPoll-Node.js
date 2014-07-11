var database = require('../lib/database');

exports.post = function(req, res) {
    var temp = "";
    req.on('readable', function() {
        temp += req.read();
    })
        .on('end', function() {
            temp = JSON.parse(temp);
            parseVote(temp);
        });
};

function parseVote(data){
    var id = data.id;
    var options = data.value;
    console(id+' '+options);
}