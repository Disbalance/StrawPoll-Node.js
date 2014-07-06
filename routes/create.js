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
}

