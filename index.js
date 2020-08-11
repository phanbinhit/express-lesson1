require('dotenv').config()
const express = require('express');
var bodyParser = require('body-parser');
var router = require('./routers/user.router');
var authRouter = require('./routers/auth.router');
var cookieParser = require('cookie-parser');
var authMiddleware = require('./middlewares/auth.middleware');

const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static("public"));
app.use(express.static("views"));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('index', {name: 'CoderX'});
});

app.use('/auth', authRouter);
app.use('/user', authMiddleware ,router);

app.listen(port, function() {
	console.log('Server listening on port' + port);
});