const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

//make sure the database is seeded
const seedAll = require('./server/seeders').seedAll;
seedAll();

const app = express();

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
// app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
/* app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
})); */

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
/* app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
}; */

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome hahaha'
}));

module.exports = app;
