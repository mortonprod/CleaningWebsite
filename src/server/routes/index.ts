import * as express from 'express';
import * as path from 'path'

let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let proxy = require('proxy-middleware');
let url = require('url');
let config = require('../../../webpack.config.js');

import { post } from "./post";
import { pages } from "./pages";
module.exports = function (app: any, passport: any) {
    var router = express.Router();
    post(router, passport);
    pages(router);
    if (process.env.NODE_ENV === 'development') {
        let base = path.join(__dirname, "..", "..", "assets");
        console.log("Base : " + base);
        //console.log(__dirname);
        let server = new WebpackDevServer(webpack(config), {
            contentBase: base,
            hot: true,
            quiet: false,
            noInfo: false,
            publicPath: "/bundle/",
    
            stats: { colors: true }
        });
        server.listen(8081, "localhost", function () { });
        app.use('/bundle', proxy(url.parse('http://localhost:8081/bundle')));
    }
    app.use('/', router);
};