var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');

var config = require('./config');

// connect database
mongoose.connect(config.db.mongoUrl);

// configurations
app.use(morgan('dev')); // logging
app.use(cookieParser()); // cookie parser
app.use(bodyParser()); // read html form inputs
app.use(expressValidator());  // use for html form input validation

app.use(express.static('public'))

// set template engine
app.set('view engine', 'ejs');

// passport.js config
require('./app/actions/passport')(passport);

app.use(session({ secret: config.passport.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./app/routes')(app, passport);

// server
app.listen(port);
console.log('Server running on Port ' + port);
