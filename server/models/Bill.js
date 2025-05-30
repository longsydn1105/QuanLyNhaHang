const mongoose = require('mongoose');
const billItemSchema = require('./BillItem');

const billSchema = new mongoose.Schema({ 
    tableID: {type: mongoose.Schema.Types.ObjectId, ref:'tables'},
    userID: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    createAt: {type: Date, default: Date.now},
    status: {type: String, enum: ['unpaid', 'paid'], default: 'unpaid'},
    items: [billItemSchema],
    totalAmount: Number,
});

module.exports = mongoose.model('Bill', billSchema);