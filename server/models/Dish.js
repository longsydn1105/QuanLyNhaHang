const mongoose = require('mongoose');
const dishSchema = new mongoose.Schema({
    name: {type: String, requed: true},
    price: {type: Number, required: true},
    description: {type: String, required: false},
    isvailable: {type: Boolean, default: true}
}); 
module.exports = mongoose.model('Dish', dishSchema);