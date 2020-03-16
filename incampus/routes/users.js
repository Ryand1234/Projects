var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const User = require('../config/schema')


router.get('/:token',
[
  check('username').isLength({min: 3}),
  check('email').isLength({min: 1}).isEmail(),
  check('password').isLength({min: 6})
  
  
],
 async (req, res, next) => {
	
	const error = validationResult(req);
	if(!error.isEmpty())
	{
		console.log("Error: ",error.array());
		//res.render('form', {errors: error.array()})
	}
	else
	{
		nuserinfo = {}
		nuserinfo.accessToken = req.params.token;
		nuserinfo.username = req.body.username;
		nuserinfo.email = req.body.email;
		nuserinfo.password = req.body.password;
		console.log(nuserinfo)

		

		var newuser = new User(nuserinfo);

		try{
			    const saveduser = await newuser.save();
				res.status(200).send(saveduser);
  			}catch(err){
    			res.status(400).send(err);
				console.log(err);
			}

		
		
	}
	res.send('respond with a resource');

});

router.post('/:token',
[
  check('name').isLength({min: 3}).isAlpha(),
  check('education').isLength({min: 1}),
  check('gender').isLength({min: 1}).isAlpha(),
  check('profession').isLength({min: 1}).isAlpha(),
  check('course').isLength({min: 1}),
  check('university').isLength({min:1}),
  check('dob').isISO8601()
  
],
 async (req, res, next) => {
	
	const error = validationResult(req);
	if(!error.isEmpty())
	{
		console.log("Error: ",error.array());
		//res.render('form', {errors: error.array()})
	}
	else
	{
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if(token==null)
   			return res.sendStatus(401);

	Blacklist.findOne({token:token}, function(err, found){
		if(found)
  		   return res.json('Token blacklisted. Cannot use this token.');
		else{
   			    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
         		if(err)
         			return res.sendStatus(403);
				var existingUser = user;
				existingUser.name = req.body.name;
				existingUser.gender = req.body.gender;
				existingUser.university = req.body.university;
				existingUser.dob = req.body.dob;
				existingUser.profession = req.body.profession;
				existingUser.education = req.body.education;
				existingUser.course = req.body.course;
				existingUser.save();
				next();
       						});
 			}
 														}
	}
 /*
 			User.findOne({accessToken: req.params.token}, function(err,existingUser){
 			if (err) console.log(err)
 			else
			{	
				existingUser.name = req.body.name;
				existingUser.gender = req.body.gender;
				existingUser.university = req.body.university;
				existingUser.dob = req.body.dob;
				existingUser.profession = req.body.profession;
				existingUser.education = req.body.education;
				existingUser.course = req.body.course;
				existingUser.save();
				console.log(existingUser)		
				}
 			});

			//console.log(existingUser)*/

	res.send('respond with a resource');
	});
	




module.exports = router;
