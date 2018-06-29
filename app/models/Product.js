var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true }
}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);