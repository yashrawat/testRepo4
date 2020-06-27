const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let expenseSchema = new Schema({
    expenseName: {
        type: String
    },
    expenseAmount: {
        type: Number
    },
    expenseDate: {
        type: Date
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
