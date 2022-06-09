const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// const addressSchema = new Schema({
// 	'address' : String
// }); 

const UserSchema = new Schema({
	'name' : String,
	'mail' : {
		type:String,
		unique:true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	'password' :{
		type:String,
		minlength:3
	},
	// 'address' : [addressSchema]}
	'address' : String}

);


UserSchema.virtual('orders', {
	ref: 'Order',
	localField: '_id',
	foreignField: 'user'
  });
UserSchema.set('toJSON',{virtuals:true});
UserSchema.set('toObject',{virtuals:true});

module.exports = mongoose.model('User', UserSchema);
