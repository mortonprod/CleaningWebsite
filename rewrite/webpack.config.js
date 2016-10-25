'use strict';
var HtmlWebpackPlugin = require('html-webpack-plugin');///Does not include app entry so not very useful.No app entry point. Only once used.
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var locals = {
    routes: [
        '/',
        '/webdevelopment',
        '/webdevelopment/blogcreation',

    ]
}
var config = {
    entry: {
        app: ['./src/indexEntry.js'],

    },
    plugins: [
        new ExtractTextPlugin("site.css")
    ],

    output: {
        path: './dist',
        filename: '[name].js',
        libraryTarget: 'umd' // Need this for static site generation.
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]

    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    //Need:?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5] to set the right name for each css!
                    "style",
                    "css!postcss-loader!sass")
            },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]'
                    //'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' To minimise images. Not working.
                ]
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }


        ]
    }
};

module.exports = config;