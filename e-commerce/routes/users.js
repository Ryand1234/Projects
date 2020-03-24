var express = require('express');
var router = express.Router();
var {check, validationResult} = require('express-validator');
var {User, product} = require("../config/User.js");

router.get('/register',
[
  check('username').isLength({min: 3}),
  check('email').isLength({min: 1}).isEmail(),
  check('password').isLength({min: 6}),
  check('number').isLength({min:10, max:10}).isNumeric(),
  
  
],
 async (req, res, next) => {

	const error = validationResult(req);
	if(!error.isEmpty())
	{
		console.log("Error: ",error.array());
		res.status(401);
	}
	else
	{
		var exist = true;
		var total_token = 0;
		var new_token = Math.floor(Math.random()*10000);
		console.log("token: "+ new_token);
		
		while(exist){
			if(total_token>10000)
			{
				res.status(301).send("Database Full");
				break;
			}
		nuserinfo = {}
		nuserinfo.accessToken = new_token;
		nuserinfo.username = req.body.username;
		nuserinfo.email = req.body.email;
		nuserinfo.password = req.body.password;
		nuserinfo.number = req.body.number;
		console.log(nuserinfo);

		var newuser = new User(nuserinfo);
		console.log(newuser);
		try{
			    const saveduser = await newuser.save();
			    exist=false;
				res.status(200);
  				res.send('User Registered');
  			}catch(err){
				console.log(err);
				new_token = Math.floor(Math.random()*3);
				total_token += 1;
			}

		
		}
	}
	

});

router.get('/login', async (req, res, next)=> {

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email: email, password: password}, (err,user)=>{
		if(err)
		{
			console.log(err);
			res.status(401).json("Email/Password is incorrect");
		}
		else
		{
			res.status(200).json(user.accessToken);
		}
	});
});

module.exports = router;
