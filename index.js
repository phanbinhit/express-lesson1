require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./routers/user.router');
var authRouter = require('./routers/auth.router');
var productRouter = require('./routers/product.router');
var cartRouter = require('./routers/cart.router');
var cookieParser = require('cookie-parser');
var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
var csrf = require('csurf');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

//connect mongoose
mongoose.connect('mongodb://localhost:27017/express-demo', {useNewUrlParser: true, useUnifiedTopology: true});

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
app.use('/cart', cartRouter);
app.use(csrf({cookie: true}));
app.listen(port, function() {
	console.log('Server listening on port' + port);
});