var express = require('express');
var router = express.Router();
var {check, validationResult} = require('express-validator');
var {User, product} = require("../config/User.js")

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
		var product_list = '';
		for(var i=0;i<list.length;i++)
      	{
      		product_list += ("product :"+list[i] + '\n');
      	}
		res.status(200).send(product_list);
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
		var total_price = 0;
		var cart_product = new Array();
		for(var i=0;i<list.length;i++)
      	{
      		total_price += parseInt(list[i].number*list[i].price);
      		cart_product.push(list[i]);
      	}
		res.json({price: total_price,
				product: cart_product });
	} 
													});
});

module.exports = router;