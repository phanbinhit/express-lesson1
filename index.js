const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req, res) {
	res.render('index', {name: 'CoderX'});
});

app.get('/user', function(req, res) {
	res.render('users/user', {users: [
		{id: 1, name: 'Binh'},
		{id: 2, name: 'Hoang'}
	]});
});

app.listen(port, function() {
	console.log('Server listening on port' + port);
})
