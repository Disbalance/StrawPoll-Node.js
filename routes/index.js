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
});


router.get('/[0-9]+/r', function(req,res) {
    res.render('result_vote');
});

router.post('/createPoll', require('./../lib/createPoll').post);
router.post('/vote', require('./../lib/vote').post);
router.post('/getResult', require('./../lib/getResult').post);
module.exports = router;
