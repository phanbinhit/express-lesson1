var db = require('../db');

module.exports = {
    index: function(req, res,next) {
        res.render('card/cards');
    },

    addCard: function(req, res, next) {
        var productId = req.params.productId;
        var sessionId = req.signedCookies.sessionId;
        if (!sessionId) {
            res.redirect('/product');
            return;
        }

        var count = db.get('sessions')
                        .find( {sessionId: sessionId} )
                        .get('card.' + productId, 0)
                        .value();
        
        db.get('sessions')
            .find( {sessionId: sessionId} )
            .set('card.' + productId, count + 1)
            .write();
        res.redirect('/product');
    },

    delCard: function(req, res, next) {
        var idDel = req.params.idDel;
        db
            .get('sessions')
            .find({sessionId: req.signedCookies.sessionId})
            .unset('card.' + idDel)
            .write();
        res.redirect('/card');
    }
}