/// @file entry of server.
import * as express from 'express';
import * as path from 'path'
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
var flash = require('connect-flash');

import passportStrategy from "./config/passport";

var passport = passportStrategy();
var app = express();

///Add all the different server side routes
require('./routes/index')(app);
console.log("Static :" + path.join(__dirname, "../..", "public"))
app.use(express.static(path.join(__dirname,"../..", "public")));

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(flash())
///app.set('view engine', require('pug'));
///app.set('views', __dirname + '/public/pug');
app.use(passport.initialize());
app.use(passport.session());
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
});