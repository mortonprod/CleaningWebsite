import * as nodemailer from 'nodemailer'
import { config }  from "../../config";
export function post(router,passport) {

    router.post('/contact', function (req, res) {
        console.log("Contact information " + req.body.name + "   " + req.body.email + "   " + req.body.message);
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: config.mail
        });
        config.mailOptions.subject = 'Cleaning customer ' + req.body.name;
        config.mailOptions.text = req.body.message + "\n" + "From: " + req.body.email;
        transporter.sendMail(config.mailOptions, function (error, info) {
///            res.redirect("/");
        });
    });
    router.post('/facebooklogin', passport.authenticate('facebooklogin', {
        successRedirect: '/',
        failureRedirect: '/loginfacebook'
    }));
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    router.post('/signup', passport.authenticate('signup', { successRedirect: '/', failureRedirect: '/signup', failureFlash: false }));
}

