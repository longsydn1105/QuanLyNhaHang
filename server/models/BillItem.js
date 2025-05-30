const mongoose = require('mongoose');
const billItemSchema = new mongoose.Schema({ 
    dishID: {type: mongoose.Schema.Types.ObjectId, ref: 'dishes', required: true},
    name: String,
    price: Number,
    quantity: Number,
    total: Number,
    note: String
}, {_id: false}); // không cần tạo id riêng cho từng item
module.exports = billItemSchema