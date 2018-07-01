var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Machine = require('./Machine').schema;

var ExpenseSchema = new Schema({
    type: { type: String, enum: ['rent', 'electricity', 'other'], default: 'other', required: true },
    amount: { type: Number, required: true },
    machine: { type: Machine, required: false },
    owner: { type: String, required: true }
}, { collection: 'expense' });

module.exports = mongoose.model('Expense', ExpenseSchema);