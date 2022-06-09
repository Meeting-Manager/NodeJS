const mongoose = require('mongoose');
const timestamp=require('timestamp');
const Schema   = mongoose.Schema;

const ItemSchema = new Schema({
	
	'product' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Product'
	},
	'quantity' : Number
});


const OrderSchema = new Schema({
	'sum' : Number,
	'date' : Date,
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'items' : [ItemSchema]
},{timestamps:true});


module.exports = mongoose.model('Order', OrderSchema);
