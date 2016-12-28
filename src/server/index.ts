/// @file entry of server.
import * as express from 'express';
import * as path from 'path'
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
var flash = require('connect-flash');

import passportStrategy from "./config/passport";
let passport = passportStrategy();
var app = express();
console.log("Static :" + path.join(__dirname, "../..", "bundle"))
app.use(express.static(path.join(__dirname, "../..", "bundle")));
//app.use(express.favicon());
app.use(cookieParser());
app.use(bodyParser());
app.use(flash())
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});
require('./routes/index')(app, passport);
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));