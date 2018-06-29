var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./Product').schema;

var OrderSchema = new Schema({
    machineID: { type: Number, required: true },
    order: { type: Product, required: true }
}, { collection: 'orders' });

module.exports = mongoose.model('Order', OrderSchema);