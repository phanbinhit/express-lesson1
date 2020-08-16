var shortid = require('shortid');
// var db = require('../db');
const Session = require('../models/session.model');
const Product = require('../models/product.model');

module.exports = async function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {signed: true});
        Session.create({sessionId: sessionId}, function (err, docs) {
            if (err) return handleError(err);
        })
    }

    var total = 0;

    var sessions = await Session.findOne({"sessionId": sessionId});
    var carts = await sessions.carts || [];
    var numberCart = 0;

    for (var i = 0 ; i < carts.length; i++) {
        var product = await Product.findById(carts[i].id);
        carts[i] = {product: product, number: carts[i].number};
        total += product.price * carts[i].number;
        numberCart += carts[i].number;
    }

    res.locals.carts = carts;
    res.locals.total = total;
    res.locals.numberCart = numberCart;

    next();
}