var express = require('express');
var router = express.Router();
var {check, validationResult} = require('express-validator');
var {User, product} = require("../config/User.js")
/* GET users listing. */
router.get('/register/:token',
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
		nuserinfo = {}
		nuserinfo.accessToken = req.params.token;
		nuserinfo.username = req.body.username;
		nuserinfo.email = req.body.email;
		nuserinfo.password = req.body.password;
		nuserinfo.number = req.body.number;
		console.log(nuserinfo);



		var newuser = new User(nuserinfo);
		console.log(newuser);
		try{
			    const saveduser = await newuser.save();
				res.status(200).send(saveduser);
  			}catch(err){
    			res.status(400).send(err);
				console.log(err);
			}

		
		
	}
	res.send('User Registered');

});

router.get('/:utoken/product/add/:ptoken', async (req, res, next)=> {
	product.findOne({accessToken: req.params.ptoken}, (err, prod)=> {
			if (err) 
			{
				console.log(err);
				res.send(401).json(err);
			}
			else
			{
				User.findOne({accessToken:req.params.utoken}, (er, cuser)=>{
					if (er) 
					{	
						console.log(er);
						res.status(401).send(er);
					}
					else
					{
						if (!cuser.cart.productname.includes(prod.name))
						{

							cuser.cart.productname.push(prod.name);
							cuser.cart.productdetail.push(prod);
							var prodlist = cuser.cart.productdetail;
							for(var i=0;i<prodlist.length;i++)
							{
								var index;
								if (prod.accessToken == prodlist[i].accessToken)
								{
									prodlist[i].number = req.body.num;
								}
							}
						}
						else{

							var prodlist = cuser.cart.productdetail;
							for(var i=0;i<prodlist.length;i++)
							{
								var index;
								if (prod.accessToken == prodlist[i].accessToken)
								{
									prodlist[i].number = parseInt(prodlist[i].number) + parseInt(req.body.num);
								}
							}
						}
						
						cuser.save();
						res.status(200).json(cuser);
						
					}
				});
			}
	});
});

router.get('/:utoken/product/remove/:ptoken', async (req, res, next)=> {
	product.findOne({accessToken: req.params.ptoken}, (err, prod)=> {
			if (err) 
			{
				console.log(err);
				res.send(401).json(err);
			}
			else
			{
				User.findOne({accessToken:req.params.utoken}, (er, cuser)=>{
					if (er) 
					{	
						console.log(er);
						res.status(401).send(er);
					}
					else
					{
						cuser.cart.productname.pull(prod.name);
						cuser.cart.productdetail.pull(prod);
						cuser.save();
						res.status(200).json(cuser);
					}
				});
			}
	});
});

router.get('/:utoken/all', async (req, res, next)=> {
	 User.findOne({accessToken:req.params.utoken}, (err, users)=> {
    if (err) 
	{	
		console.log(er);
		res.status(401).send(er);
	}
	else
	{
		var list = users.cart.productdetail;
		var list_2 = '';
		for(var i=0;i<list.length;i++)
      	{
      		list_2 += ("product :"+list[i] + '\n');
      	}
		res.status(200).send(list_2);
	}
	
});

	});

router.get('/:utoken/checkout', async (req, res, next)=> {
	User.findOne({accessToken:req.params.utoken}, (err, users)=> {
    if (err) 
	{	
		console.log(er);
		res.status(401).send(er);
	}
	else
	{
		var list = users.cart.productdetail;
		var tprice = 0;
		var product1 = new Array();
		for(var i=0;i<list.length;i++)
      	{
      		tprice += parseInt(list[i].number*list[i].price);
      		product1.push(list[i]);
      	}
		res.json({price: tprice,
				product: product1 });
	} 
});
});
module.exports = router;
