var express = require('express');
var router = express.Router();
var {check, validationResult} = require('express-validator');
var {product, User} = require("../config/User.js")
/* GET users listing. */
router.get('/add',
[
  check('name').isLength({min: 1}),
  check('detail').isLength({min: 6}),
  check('price').isNumeric(),
  
  
],
 async (req, res, next) => {
	
	const error = validationResult(req);
	if(!error.isEmpty())
	{
		console.log("Error: ",error.array());
		res.status(401).json(error);
	}
	else
	{
		nprodinfo = {}
		nprodinfo.accessToken = req.body.token;
		nprodinfo.name = req.body.name;
		nprodinfo.price = req.body.price;
		nprodinfo.detail = req.body.detail;
		console.log(nprodinfo);



		var newuser = new product(nprodinfo);
		console.log(newuser);
		try{
			    const saveduser = await newuser.save();
				res.status(200).send(saveduser);
  			}catch(err){
    			res.status(400).send(err);
				console.log(err);
			}

		
	res.send('Product Added');	
	}
	

});

router.get('/:token', (req, res, next)=> {
	product.findOne({accessToken: req.params.token}, (err,prod)=> {
		if (err) console.log(err)
		else
			{
				res.status(200).json(prod);
			}
			
	});
	
});

router.get('/all', async (req, res, next)=> {
	 product.find({}, (err, users)=> {
    if (err) 
	{	
		console.log(er);
		res.status(401).send(er);
	}
	else
	{
		console.log(users);
		res.send(users);
	}
	
});

	});

module.exports = router;
