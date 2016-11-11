///@function Routes - Link routes to pug/react templates and passport authentication. 
/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server'
import * as express from 'express';
import * as path from 'path'
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as nodemailer from 'nodemailer'
var flash = require('connect-flash');

import param from "../globalParameters.ts";
import Contact from "../../tsx/contact.tsx";
import passportStrategy from "./passport.ts";


///Set the engine to produce the html views from
///Must create the element from the jsx class.
var contactApp = React.createFactory(Contact)
var passport = passportStrategy();
var app = express();

export default function createApp() {
    app.use(cookieParser());
    ///Populate req.body
    app.use(bodyParser());
    ///Set location of files to server to client
    app.use(session({ secret: 'keyboard cat' }));
    app.use(flash())
    app.set('view engine', 'pug');
    app.set('views', __dirname + '/public/pug');
    app.use(passport.initialize());
    ///This is need to setup a session with passport
    app.use(passport.session());
    ///@function Use "this" to get response and return 404 if not found
    function send(err, html) {
        if (err) {
            this.redirect('/404');
        } else {
            this.send(html);
        }
    }
    app.get('/', function (req:any, res:any) {
        console.log("index html get!")
        ///Only call renderToString on server. Used for SEO and quicker page loads.
        ///When you call render on client side only event handlers are attached so quick load up.
        //See here:https://www.quora.com/What-is-the-difference-between-React-render-React-renderToStaticMarkup-and-React-renderToString
        var contactString = ReactDOMServer.renderToString(contactApp());
        if (req.session && req.session.passport && req.session.passport.user) {
            console.log("contact string with name " + contactString)
            console.log("req " + JSON.stringify(req.session.passport.user));
            res.render('index', { contact: contactString, name: req.session.passport.user.name },send);
        } else {
            console.log("contact string " + contactString)
            ///Contact served as a simple string variable with pug.
            res.render('index', { contact: contactString }, this.checkRender(err,html));
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
        console.log("Contact information " + req.body.name + "   " + req.body.email + "   " + req.body.message);
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: param().mail
        });
        param().mailOptions.subject = 'Cleaning customer ' + req.body.name;
        param().mailOptions.text = req.body.message + "\n" + "From: " + req.body.email;
        transporter.sendMail(param().mailOptions, function (error, info) {
            res.redirect("/");
        });
    });
    return app;
}