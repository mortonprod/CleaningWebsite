/// <reference path="../../../typings/index.d.ts" />
///@file passport.ts - Return configured passport. 
import * as passport from 'passport';
import * as mysql from 'mysql';
import * as passportLocal from 'passport-local';
import param from "../globalParameters.ts";
var LocalStrategy = passportLocal.Strategy;
var connection = mysql.createConnection(param().con);
export default function passportStrategy() {
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
    return passport;
}