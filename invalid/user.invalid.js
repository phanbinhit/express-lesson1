module.exports = function(req, res, next) {
	var errors = [];
	var itemPost = req.body;
	if (!itemPost.name.length) {
		errors.push("invalid name");
	}

	if (!itemPost.phone.length) {
		errors.push("invalid phone");
	}

	if (errors.length > 0) {
		res.render('users/create', {errors: errors, values: req.body});
		return;
	}

	res.locals.itemPost = itemPost;
	next();
}