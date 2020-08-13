var shortid = require('shortid');
var db = require('../db.js');

module.exports = {
	index: function(req, res) {
		res.render('users/user', {users: db.get('users').value(), query: ""});
		console.log(req.cookies);
	},

	search: function(req, res) {
		var query = req.query.q;
		var userMatchs = db.get('users').value().filter(function(user) {
			return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
		});
		res.render('users/user', {users: userMatchs, query: query});
	},

	getCreate: function(req, res) {
		res.render('users/create');
	},

	getViewUser: function(req, res) {
		var id = req.params.id;
		var user = db.get('users').find({id: id}).value();
		res.render('users/view', {user: user});
	},

	postCreate: function(req, res) {
		req.body.id = shortid.generate();
		console.log(res.locals);
		var itemPost = res.locals.itemPost;
		db.get('users').push(itemPost).write();
		res.redirect('/user');
	}
}