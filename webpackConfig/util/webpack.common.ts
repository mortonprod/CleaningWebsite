/// <reference path="../../typings/node/node.d.ts" />
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    ////All the files we need.
    entry: {
        'polyfills': './tsLibsExport/polyfills.ts',
        'vendor': './tsLibsExport/vendor.ts',
        'app': '../App/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        ///Loaders are just task. Each file will get it's own loader(tasks to do)
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader'] /// ts=> compile, angular2... => inline 
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('App'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap') ///Extract all css files in files given.
            },
            {
                test: /\.css$/,
                include: helpers.root('App'),
                loader: 'raw'
            }
        ]
    },
    ///TODO:I think this runs after the loaders???
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ ///Pulls out most used modules in the app
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: '../App/index.html'
        })
    ]
};