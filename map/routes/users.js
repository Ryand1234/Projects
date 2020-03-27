var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('/home/riyan/github/Projects/map/views/map_value.html');
});

router.post('/', function(req, res, next) {
	var lat = req.body.latitude;
	var lng = req.body.longitude;

  res.render('map', {lat: lat, lng: lng});
});

module.exports = router;
