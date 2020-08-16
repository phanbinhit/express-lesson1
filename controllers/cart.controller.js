// var db = require('../db');
const Session = require('../models/session.model');
const { isValidObjectId } = require('mongoose');
const { constant } = require('../db');
const shortid = require('shortid');

module.exports = {
    index: function(req, res,next) {
        res.render('cart/carts');
    },

    addCart: async function(req, res, next) {
        var productId = req.params.productId;
        var sessionId = req.signedCookies.sessionId;
        if (!sessionId) {
            res.redirect('/product');
            return;
        }
        
        var sessions = await Session.findOne({"sessionId": sessionId});
        var carts = await sessions.carts;
        var number = 1;

        ids = carts.map(function(cart) {
            return cart.id;
        })

        for (var i = 0 ; i < carts.length; i++) {
            if (carts[i].id === productId) {
                number = carts[i].number + 1;
            }
        }

        if (carts.length === 0 || ids.indexOf(productId) === -1) {
            Session.update(
                {"sessionId": sessionId},
                {"$push": {"carts": {"id": productId, "number": number}}},
                function(err, docs) {
                    if (err) throw err;
                }
            );
        } else {
            Session.update(
                {"sessionId": sessionId,"carts.id": productId},
                {"$set": {"carts.$.number": number}},
                function(err, docs) {
                    if (err) throw err;
                }
            );
        }

        res.redirect('/product');

    },

    delCart: function(req, res, next) {
        var id = req.body.id;
        var sessionId = req.signedCookies.sessionId;
        Session.update(
            {"sessionId": sessionId},
            { $pull: {"carts": {id: id}}},
            function(err, docs) {
                if (err) throw err;
            }
        )
    }
}