/// <reference path="../../../typings/index.d.ts" />
import * as express from 'express';
import * as path from 'path'
import { post } from "./post";
import { pages } from "./pages";
console.log("NOD_ENV: " + process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('../../../webpack.config.js'); ///Called from dist folder!!!!
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.entry.index.unshift("webpack-dev-server/client?http://localhost:8081/", "webpack/hot/dev-server");
    config.entry.login.unshift("webpack-dev-server/client?http://localhost:8081/", "webpack/hot/dev-server");
    var proxy = require('proxy-middleware');
    var url = require('url');
}

module.exports = function (app: any, passport: any) {
    var router = express.Router();
    post(router, passport);
    pages(router);
    if (process.env.NODE_ENV === "development") {
        var server = new WebpackDevServer(webpack(config), {
            contentBase: "./dist",
            hot: true,
            quiet: false,
            noInfo: false,
            publicPath: "/bundle",
            stats: { colors: true } 
        });
        server.listen(8081, "localhost", function () { });
        app.use('/bundle', proxy(url.parse('http://localhost:8081/bundle')));
    }
    app.use('/', router);
};