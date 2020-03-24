const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

	name:{
		type: String,
		require: true
	},

	price:{
		type: String,
		require: true
	},

	detail:{
		type: String,
		require: true
	},

	accessToken:{
		type: String,
		require: true
	},

	number:{
		type:Number
	}
});

const product = mongoose.model("product", productSchema);

const userSchema = new mongoose.Schema({

	username:{
		type: String,
		require: true
	},

	password:{
		type: String,
		require: true
	},

	email:{
		type: String,
		require: true
	},

	number:{
		type:String,
		require: true
	},

	accessToken:{
		type: String,
		unique: true
	},

	cart:{
		productname: [String],
		productdetail: [productSchema]
	}
});


const User = mongoose.model("User", userSchema);

module.exports = {
	product:product,
	User:User
}