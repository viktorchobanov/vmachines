var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    machineID: { type: Number, required: true },
    message: { type: String, required: true }
}, { collection: 'message' });

module.exports = mongoose.model('Message', MessageSchema);