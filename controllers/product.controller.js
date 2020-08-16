// const db = require('../db.js');
const Product = require('../models/product.model');

module.exports = {
    index: async function(req, res, next) {
        // var trunks = [];
        // var page = req.query.page || 1;
        // var numProduct = 8;
        // var start = (page - 1) * numProduct;
        // var end = page * numProduct;
        // products = db.get('products').value().slice(start, end);

        // console.log(trunks.length);

        // var productsTrunk = [];
        // var trunk = 4;
        // var length = db.get('products').value().length;
        // var numLink = Math.ceil(length / 8);
        // var links = [];

        // for (var i = 0 ;i < numLink; i++) {
        //     links.push(i+1);
        // }
    
        // for (var i = 0; i < products.length; i = i + trunk) {
        //     productsTrunk.push(products.slice(i, i + trunk));
        // }
        // res.render('products/product', {products: productsTrunk, links: links, page: parseInt(page)});
        var products = await Product.find();
        res.render('products/product', {products: products});
    }
}