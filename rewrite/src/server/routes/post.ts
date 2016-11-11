/// <reference path="../../../typings/index.d.ts" />
import * as passport from 'passport';
import * as nodemailer from 'nodemailer'
import  global  from "../config/global";
export function contact(router) {

    router.post('/contact', function (req, res) {
        console.log("Contact information " + req.body.name + "   " + req.body.email + "   " + req.body.message);
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: global().mail
        });

        global().mailOptions.subject = 'Cleaning customer ' + req.body.name;
        global().mailOptions.text = req.body.message + "\n" + "From: " + req.body.email;
        transporter.sendMail(global().mailOptions, function (error, info) {
///            res.redirect("/");
        });
    });
    app.post('/facebooklogin', passport.authenticate('facebooklogin', {
        successRedirect: '/',
        failureRedirect: '/loginfacebook'
    }));
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    app.post('/signup', passport.authenticate('signup', { successRedirect: '/', failureRedirect: '/signup', failureFlash: false }));
}

