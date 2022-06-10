var express = require('express');
var router = express.Router();

// var imageController = require('../controller/imageController')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.post('/upload', function (req, res, next) {
//   res.send(req.body)
//   console.log(req.body)
// })

module.exports = router;
