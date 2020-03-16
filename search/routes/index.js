var express = require('express');
var router = express.Router();
var search = require('../config/search')
var cinema = require('../config/data')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/home/riyan/github/Projects/search/views/test.html');
});

router.post('/submit', (req, res, next) => {
	
	movieData = {};
	movieData.movie = req.body.movie;
	movieData.name = req.body.name;
	movieData.npeople = req.body.people;

	var user = new cinema(movieData);
	user.save();
	res.send("Hello");
});

module.exports = router;
