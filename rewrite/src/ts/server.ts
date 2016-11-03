/// <reference path="../../typings/index.d.ts" />
var express = require('express');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('./user');
var app = express();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'cleanBase'
});
///@function serial...
/// This is needed after authentication, when the cookie is provided.
/// Passport will serialize this then it will pass it to the callback function which then calls done.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
/// @function signup
/// This function is called from the signup post route. 
/// Usernamefield and passwordField is what the field is called from request. 
/// passReqToCallback is used to pass the address etc not just username and password.
/// Done is used is to specify success or failure to the router callback in app.post signup.
passport.use('signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    function (req, email, password, done) {
        console.log("authentication signup");
        console.log("email: " + email);
        console.log("password: " + password);
        console.log("req: " + req);
        var newUserMysql = new Object();
        newUserMysql.email = email;
        newUserMysql.password = password; // use the generateHash function in our user model
        var insertQuery = "INSERT INTO Users ( email, password ) values ('" + email + "','" + password + "')";
        console.log(insertQuery);
        connection.query(insertQuery, function (err, rows) {
            newUserMysql.id = rows.insertId;
            return done(null, newUserMysql);
        });
    }
));

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    function (email, password, done) {
        console.log("email: " + email);
        console.log("password: " + password);
        var user = {};
        var insertQuery = "SELECT FirstName, SecondName, email, Password FROM Users WHERE email = '" + email + "' AND Password = '" + password + "'";
        console.log(insertQuery);
        connection.query(insertQuery, function (err, rows) {
            if (err) {
                console.log("Login error = " + err);
                return done(null, false);
            } else {
                console.log("rows " + JSON.stringify(rows));
                user.name = rows[0].FirstName + " " + rows[0].SecondName;
                user.email = rows[0].email;
                console.log("Login user " + JSON.stringify(user));
                return done(null, user);
            }
        });
    }
));


///Set location of files to server to client
app.use(express.static(__dirname + '/public'));
///Populate req.cookies. 
app.use(cookieParser());
///Populate req.body
app.use(bodyParser());
///Create session middleware with the given options
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
///This is need to setup a session with passport
app.use(passport.session());
app.use(flash())
///Set the engine to produce the html views from
app.set('view engine', 'pug');
///Set where we look for views
app.set('views', __dirname + '/public/pug');
app.get('/', function (req, res) {
    if (req.session && req.session.passport && req.session.passport.user) {
        console.log("req " + JSON.stringify(req.session.passport.user));
        res.render('index', { name: req.session.passport.user.name });
    } else {
        res.render('index');
    }
    ///else(not signed in)

});

app.get('/login', function (req, res) {
    ///SQL database code
    ///If signed in:
    res.render('login');
    ///else(not signed in)

});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect("/");
});


app.get('/signup', function (req, res) {
    ///SQL database code
    ///If signed in:
    res.render('signup', { name: 'Alex' });
    ///else(not signed in)

});
/// @function signup 
/// Get signup information and save using passport.
/// The request is passed since authenticate is called inside function. 
/// The callback success/failure is determined from the authenticate. 
//app.post('/signup', function (req, res, next) {
//    console.log("post signup");
//    passport.authenticate('signup', { successRedirect: '/', failureRedirect: '/signup', failureFlash: true });
//})
app.post('/signup', passport.authenticate('signup', { successRedirect: '/', failureRedirect: '/signup', failureFlash: false }));

/// @function login 
/// Passport local login route
app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.post('/contact', function (req, res) {
    console.log("Contact information " + req)
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'atticusfbf@gmail.com', 
            pass: '975975975'
        }
    });
    var mailOptions = {
        from: 'atticusfbf@gmail.com', // sender address
        to: 'mortonprod@gmail.com', // list of receivers
        subject: 'Email Example', // Subject line
        text: "I sent this from node." //, // plaintext body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({ yo: 'error' });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({ yo: info.response });
        };
    });
});


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
});