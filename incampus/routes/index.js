var express = require('express');
const {google} = require('googleapis')
const oauth2data = require('./data.json')
var router = express.Router();

/* GET home page. 
const client_id = oauth2data.web.client_id
const client_secret = oauth2data.web.client_secret
const redirect_url = oauth2data.web.redirect_url
var auth2 = google.auth.OAUTH2;
var oauth2client = new auth2(client_id, client_secret, redirect_url);
var isauthorized = false;
router.get('/', function(req, res, next) {
  if (!isauthorized)
  {
  	const url = oauth2client.generateAuthUrl({
  		access_type: 'offline',
  		scope : 'https://www.googleapis.com/auth/gmail.readonly'
  	});
  	console.log(url);
  	res.redirect(url);
  }
  else{
  	const gmail = google.gmail({version: 'v1', auth: oauth2client});
  	gmail.users.labels.list({
  		userId: 'me',
  	},function(err, res) {
  		if(err) return console.log("The Api returned an error "+ err);
  		const labels = res.data.labels;
  		if(labels.length){
  			console.log("labels: ");
  			labels.forEach((label) => {
  				console.log(`- ${label.name}`);
  			});
  		} else {
  			console.log("no lael found");
  		}
  	});
  	res.send("Logged In")
  }
});

router.get('/auth/google', function (req, res) {
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oauth2client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oauth2client.setCredentials(tokens);
                isauthorized = true;
                res.redirect('/')
            }
        });
    }
});
*/
module.exports = router;