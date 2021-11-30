const express = require('express');
const morgan = require('morgan');
const path = require('path');

// initialization
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// global variables
app.use((req, res, next) => {
    next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('links', require('./routes/links'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(app.get('port'), () => {
    console.log('Server run on port: ', app.get('port'))
});