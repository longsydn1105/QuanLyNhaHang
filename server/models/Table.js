const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({ 
    name: {type: String, required: true, unique: true},
    status: {type: String, enum: ['available', 'occupied'], default: 'available'},
    currentBillID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        default: null
    }
});

module.exports = mongoose.model('Table', tableSchema);