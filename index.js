require('dotenv').config()
const express = require('express');
var bodyParser = require('body-parser');
var router = require('./routers/user.router');
var authRouter = require('./routers/auth.router');
var productRouter = require('./routers/product.router');
var cardRouter = require('./routers/card.router');
var cookieParser = require('cookie-parser');
var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static("public"));
app.use(express.static("views"));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('index', {name: 'CoderX'});
});

app.use('/auth', authRouter);
app.use('/user', authMiddleware ,router);
app.use('/product', productRouter);
app.use('/card', cardRouter);
app.listen(port, function() {
	console.log('Server listening on port' + port);
});