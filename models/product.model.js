const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title: String,
    image: String, 
    decription: String, 
    price: String
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;