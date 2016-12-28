/// @file entry of server.
import * as express from 'express';
import * as path from 'path'
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var flash = require('connect-flash');

import passportStrategy from "./config/passport";
let passport = passportStrategy();
var app = express();
console.log("Static :" + path.join(__dirname, "..", "assets"))
app.use(express.static(path.join(__dirname, "..", "assets")));
//app.use(express.favicon());
app.use(cookieParser());
app.use(bodyParser());
app.use(flash())
//Networking: mongodb is the compose image name. db is the service name in compose(like web!) then default port
mongoose.connect('mongodb://database:27017', {}, function (err) {
    if (err) {
        console.log("No DB found")
    } else {
        app.use(session({ secret: 'keyboard cat', store: new MongoStore({ mongooseConnection: mongoose.connection }) }));
    }
});
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === "production") {
    app.get('*.js', function (req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
    });
}
require('./routes/index')(app, passport);
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));