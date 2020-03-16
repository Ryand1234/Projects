const passport = require('passport')
const Google = require('passport-google-oauth20').Strategy;
const data = require('./info')
const User = require('../routes/users')

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

