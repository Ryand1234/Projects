const mongoose = require('mongoose')


const userSchema = new mongoose.Schema ({


	username:{
    	type:String,
    	required: true
  		},

  password:{
    	type:String,
    	required:true
  		},

  	email: {
    	type : String,
    	required: true
  		},

	name: {
		type : String

		},

	dob: {
		type: String

		},

	university:{
		type : String

			},

	organisation:{
		type : String
			},

	course: {
		type : String

			},

	image: {
			data: Buffer,
			contentType: String
			},

	gender:{
		type : String

			},

	// for testing
	accessToken: {
		type: String
			},

	profession: {
		type : String

				},

	education: {
		type : String

			}
});

module.exports = User = mongoose.model("User",userSchema);