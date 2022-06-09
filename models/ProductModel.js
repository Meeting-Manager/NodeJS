const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({
	'name' : String,
	'description' : String,
	'price' : Number,
	'category' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Category'
	},
	'imgName' : String
});

module.exports = mongoose.model('Product', ProductSchema);
