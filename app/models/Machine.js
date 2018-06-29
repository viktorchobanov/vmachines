var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MachineSchema = new Schema({
    machineID: { type: Number, required: true },
    owner: { type: String, required: true },
    country: { type: String, lowercase: true, required: true },
    state: { type: String, lowercase: true, required: true },
    city: { type: String, lowercase: true, required: true },
    street: { type: String, lowercase: true, required: true },
    type: { type: String, required: true },
    products: { type: [Object], required: true, default: [] }
}, { collection: 'machines' });

module.exports = mongoose.model('Machine', MachineSchema);
