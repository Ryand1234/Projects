var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('map_value.ejs');
});

router.post('/', function(req, res, next) {
	var lat = req.body.latitude;
	var lng = req.body.longitude;
	var api = process.env.APIKEY;
  res.render('map', {lat: lat, lng: lng, API_KEY: api});
});

module.exports = router;
