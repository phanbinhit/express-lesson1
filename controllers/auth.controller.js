var db = require('../db.js');
var md5 = require('md5');

module.exports = {
	authLogin: function(req, res, next) {
		res.render('auth/login', {errors: []});
	},

	postLogin: function(req, res, next) {
		var errors = [];
		var email = req.body.email;
		var password = req.body.password;
		if (!email) {
			errors.push("Invalid email");
			res.render('auth/login', {errors: errors});
			return;
		}

		var user = db.get('users').find( {email: email} ).value();
		if (!user) {
			errors.push("User does not exist");
			res.render('auth/login', {errors: errors});
			return;
		}

		if (md5(password) !== user.password) {
			errors.push("Wrong passwork");
			res.render('auth/login', {errors: errors});
			return;
		}

		res.cookie('userId', user.id, {signed: true});
		res.redirect('/user');
	}
}	