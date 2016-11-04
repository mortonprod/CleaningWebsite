'use strict';
var webpack = require('webpack');
var config = {
    entry: {
        server: ['./src/ts/server.ts']

    },
    target: "node",
    node: {
        fs: "empty"
    },
    plugins: [
    ],

    output: {
        path: './dist',
        filename: '[name].js',
        libraryTarget: 'umd' // Need this for static site generation.
    },
    module: {
        preLoaders: [
            { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
        ],
        loaders: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};

module.exports = config;