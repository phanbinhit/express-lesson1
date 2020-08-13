var shortid = require('shortid');
var db = require('../db');

module.exports = function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {signed: true});
        db.get('sessions').push({sessionId: sessionId}).write();
    }

    var numCard = 0;
    var cards = [];
    var total = 0;
    var productIds = db.get('sessions').find( {sessionId : sessionId} ).value().card;

    for (var id in productIds) {
        numCard += productIds[id]; 
        var product = db.get('products').find( {id : id} ).value();
        cards.push({product: product, number: productIds[id]});
    }

    for (var i = 0; i < cards.length; i++) {
        total += cards[i].product.price;
    }
    
    res.locals.total = total;
    res.locals.cards = cards;
    res.locals.numCard = numCard;
    next();
}