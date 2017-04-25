import { config } from "../config";
const http2 = require('http2');
import * as express from 'express';
import * as path from 'path'
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as fs from "fs";
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var flash = require('connect-flash');
console.log("Init db...");
let db = mongoose.connect(config.db.name).connection;
db.once('open', function () {
    console.log("Get passport...")
    let passport = require("./passport");
    console.log("Add middleware...");
    let app = express();
    require('express-http2-workaround')({ express: express, http2: http2, app: app });///Fix http2 and express compatibility.
    let st = [__dirname, ...config.staticLocation]
    app.use(express.static(path.join(...st)));
    let sessionOpts = {
        saveUninitialized: true, // saved new sessions
        resave: false, // do not automatically write to the session store
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        secret: config.db.secret,
        cookie: { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser(config.db.secret))
    app.use(flash())//This is how we setup flash fail authentication.
    app.use(session(sessionOpts));
    app.use(passport.initialize());///Attach passport to express middleware.
    app.use(passport.session());
    if (config.jsTogz) {
        app.get('*.js', function (req, res, next) {
            req.url = req.url + '.gz';
            res.set('Content-Encoding', 'gzip');
            next();
        });
    }
    console.log("Add routes...");
    require('./routes/index')(app, passport);
    console.log("");
    let options = {
        key: fs.readFileSync(config.ssl.key),
        cert: fs.readFileSync(config.ssl.cert)
    };
    http2.createServer(options, app).listen(config.port, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + config.port + '.')
        }
    });
});