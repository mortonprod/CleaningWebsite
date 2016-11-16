﻿'use strict';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var isProd = (process.env.NODE_ENV === 'production');
let entryFill = {
    index: ['./src/client/pagesEntry/index.tsx'],
    login: ['./src/client/pagesEntry/login.tsx'],
    signup: ['./src/client/pagesEntry/signup.tsx'],
    smoothTransition: ['./src/client/utils/smoothTransition.ts'],
    pageScroll: ['./src/client/utils/pageScroll.ts'],
    vendor: ['react', 'bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/js/bootstrap.js', 'react-dom', 'jquery', 'jquery-ui-bundle', "react-dom", "redux-thunk", 'redux', 'react-redux']
}
//if (!isProd) {
//    entryFill.devServer = 'webpack/hot/dev-server';
//    entryFill.devClient = 'webpack-dev-server/client?http://localhost:8081';
//}
//if (!isProd) {
//    var publicPathFill = "http://localhost:8081/bundle/";
//} else {
//    var publicPathFill = "/bundle/";
//}

var config = {
    /**
     * Entry for all client side code.
     * @var {object} entry
     */
    entry: entryFill,
    plugins: [
        new ExtractTextPlugin("site.css"),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],

    output: {
        path: '/dist/public/bundle',
        filename: '[name].js',
        libraryTarget: 'umd'
        //publicPath: publicPathFill
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]

    },
    module: {
        loaders: [
            //  { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true'},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    //Need:?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5] to set the right name for each css!
                    "style",
                    "css!postcss-loader!sass")
            },
            //  { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.(png|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    }
};

module.exports = config;