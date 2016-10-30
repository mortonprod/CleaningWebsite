var express = require('express');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./User');
var app = express();
///Set location of files to server to client
app.use(express.static('public'));
///Populate req.cookies. 
app.use(express.cookieParser());
///Populate req.body
app.use(express.bodyParser());
///Create session middleware with the given options
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
///This is need to setup a session with passport
app.use(passport.session());
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    ///SQL database code
    ///If signed in:
    res.render('../index', { customerName: 'TestCustomer', message: 'Welcome back' });
    ///else(not signed in)

});

const user = {
    username: 'test-user',
    password: 'test-password',
    id: 1
}

/// @function login 
/// Passport local login function. Local strategy will pass username password to callback function. The cb function will then call done().
/// This will be used when authenticate local is used as a route.
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findUser({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
/// @function login 
/// Passport local login route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
});