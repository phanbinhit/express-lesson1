const express = require('express');
var bodyParser = require('body-parser');
var router = require('./routers/user.router');

const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('index', {name: 'CoderX'});
});

app.use('/user', router);

app.listen(port, function() {
	console.log('Server listening on port' + port);
});