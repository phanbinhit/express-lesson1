// var shortid = require('shortid');
// var db = require('../db.js');
const User = require('../models/user.model');
const md5 = require('md5');

module.exports = {
	index: async function(req, res, next) {
		// res.render('users/user', {users: db.get('users').value(), query: ""});
		// console.log(req.cookies);
		var users = await User.find();
		res.render('users/user', {users: users, query: ""});
	},

	search: async function(req, res, next) {
		var query = req.query.q;
		// var userMatchs = db.get('users').value().filter(function(user) {
		// 	return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
		// });
		// res.render('users/user', {users: userMatchs, query: query});

		var users = await User.find();
		var userMatchs = users.filter(function(user) {
			return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
		});

		res.render('users/user', {users: userMatchs, query: query});
	},

	getCreate: function(req, res) {
		res.render('users/create');
	},

	getViewUser: async function(req, res) {
		var id = req.params.id;
		var user = await User.findById(id, function(err, docs){
			if (err) return handleError(err);
		})
		res.render('users/view', {user: user});
	},

	postCreate: async function(req, res) {
		req.body.password = md5(req.body.password);
		req.body.path = req.file.path.split('\\').slice(1).join('/');
		User.create(req.body, function(err, docss) {
			if (err) return handleError(err);
		})
		res.redirect('/user');
	}
}