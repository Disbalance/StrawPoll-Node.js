var database =  require('../lib/database.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/[1-9]+', function(req,res) {
   var s = req.url;
   var n = s.substring(1, s.length);
   database.getDataDB(n,res);
/*   res.render('index_vote',{title: 'HELLO'});*/
});


router.get('/[0-9]+/r', function(req,res) {
    var s = req.url;
    var data = [];
    data = s.split('/');
    console.log(req);
    res.end('RESULT');
});

router.post('/createPoll', require('./../lib/createPoll').post);
router.post('/vote', require('./../lib/vote').post);
module.exports = router;
