const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    sessionId: String,
    carts: {
        type: Array
    } 
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;