const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const flash = require('connect-flash');
const {database} = require('./keys');

// initialization
const app = express();
require('./lib/passport');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'mathebasics',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(app.get('port'), () => {
    console.log('Server run on port: ', app.get('port'))
});