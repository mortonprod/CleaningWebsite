///@file passport.ts - Return configured passport. 
import { dbStore } from "./dbstore";
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportFacebook from 'passport-facebook';
//import { database } from "../models/database";
var LocalStrategy = passportLocal.Strategy;
var FacebookStrategy = passportFacebook.Strategy;
//var db = database();
module.exports = (function () {
    let dbParts = dbStore.getInstance();
    ///Once the strategy gets the user information save what we need to cookie sent to client and saved to mongodb on server.
    passport.serializeUser((user: any, done) => {
        var sessionUser = { _id: user._id, name: user.name, email: user.email}
        done(null, sessionUser)
    })
    ///When we contact again we can access the information about the user from session.
    passport.deserializeUser((sessionUser, done) => {
        //If we need to get more information to pass to response then do it now.
        done(null, sessionUser)
    })
    /**
    * Post action will pass username password on request which is parsed by passport and passed to this function.
    */
    passport.use('local', new LocalStrategy(
        function (username, password, done) {
            dbParts.modelGlobal.find({ username: username }, function (err, user) {
                if (err) throw err;
                dbParts.modelGlobal.comparePassword(password, function (err, isMatch) {
                    if (err) throw err;
                    console.log(password, isMatch);
                    return done(null, user);
                });
            });
        }
    ));
    /**
      *  Signup will take the passed information and create a new entry.
      * Once completed pass back to post signup route. 
      */
    passport.use('signup', new LocalStrategy({ passReqToCallback: true },
        function (req, email, password, done) {
            var user = new dbParts.modelGlobal({
                name: {
                    first: req.body.name.first,
                    second: req.body.name.second
                },
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                datesTimes: req.body.dataTimes,
                reviews: req.body.reviews,
                messages: req.body.messages
            });
            user.save(function (err, data) {
                if (err) console.log(err);
                else console.log('Saved : ', data);
            });
            done(null, user)
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
})();

