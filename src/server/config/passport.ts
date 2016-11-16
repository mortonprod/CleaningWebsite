/// <reference path="../../../typings/index.d.ts" />
///@file passport.ts - Return configured passport. 
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportFacebook from 'passport-facebook';
import { database } from "../models/database";
var LocalStrategy = passportLocal.Strategy;
var FacebookStrategy = passportFacebook.Strategy;
var db = database();
export default function passportStrategy() {
    ///@function serial...
    /// This is needed after authentication, when the cookie is provided.
    /// Passport will serialize this then it will pass it to the callback function which then calls done.
    passport.serializeUser(function (user, done) {
        console.log("serialize: You;ve just logged in by calling done in passport. Save what you need to response by passing to done.");
        console.log("User name :" + user.name);
        console.log("User email:" + user.email);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log("deserialize: Your back again. Get what you need then call success/fail route from post which go you here.");
        console.log("User name :" + user.name);
        console.log("User email:" + user.email);
        done(null, user);
    });
    passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        function (req, email, password, done) {
            var user = { name: "here", email: "here2" };
            return done(null, user);
            //console.log("login on server");
            //db.getUserFromDB(email, password)
            //.then(function (user) {
            //    console.log("User name :" + user.name);
            //    console.log("User email:" + user.email);
            //    ///Return done???
            //    done(null, user);
            //},
            //function (err) {
            //    console.log("User err:" + err);
            //    done(err, false);
            //});
        }
    ));
    passport.use('signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        function (req, email, password, done) {
            db.setNewUser(email, password)
                .then(function (user) {
                    done(null, user);
                },
                function (err) {
                });
        }
    ));
    passport.use(new FacebookStrategy({
        clientID: "587582081437566",
        clientSecret: "579282c7afaa152bde52d1d8f5f7a12f",
        callbackURL: "http://localhost:/"
    },
        function (accessToken, refreshToken, profile, cb) {
            //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            //    return cb(err, user);
            //});
        }
    ));
    return passport;
}