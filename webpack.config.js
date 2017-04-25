'use strict';
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
let getPlugins;
var isProd = (process.env.NODE_ENV === 'production');
console.log("Production: " + isProd);

let entryFill = {
    index: ['./src/bundle/index.tsx'],
//    login: ['./src/bundle/login.tsx'],
//    signup: ['./src/bundle/signup.tsx'],
    vendor: ['react', 'bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/js/bootstrap.js', 'react-dom', 'jquery', 'jquery-ui-bundle', "redux-thunk", 'redux', 'react-redux']
}
if (isProd) {
    var publicPathFill = "./dist/assets/bundle";
    getPlugins = function () {
        return [
            new SWPrecacheWebpackPlugin(
                {
                    cacheId: 'cleaning-website',
                    filename: 'service-worker.js',
                    maximumFileSizeToCacheInBytes: 4194304,
                    runtimeCaching: [{
                        handler: 'cacheFirst',
                        urlPattern: /[.]js$/
                    }],
                }
            ),
            new ExtractTextPlugin("site.css"),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            //new webpack.optimize.DedupePlugin(),
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
            //new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            })
            //new CompressionPlugin({
            //    asset: "[path].gz[query]",
            //    algorithm: "gzip",
            //    test: /\.js$|\.css$|\.tsx$/,
            //    threshold: 10240,
            //    minRatio: 0.8
            //})
        ]
    }
} else {
    var publicPathFill = "/bundle/";
    getPlugins = function () {
        return [
            new ExtractTextPlugin("site.css"),
            //new Webpack.HotModuleReplacementPlugin()
        ]
    }

}

module.exports = {
    /**
     * Entry for all client side code.
     * @var {object} entry
     */
    entry: entryFill,
    plugins: getPlugins(),

    output: {
        path: publicPathFill,
        filename: '[name].js',
        libraryTarget: 'umd'
        //publicPath: publicPathFill
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        //alias: {
        //    'react': 'preact-compat',
        //    'react-dom': 'preact-compat',
        //    'react-router': 'preact-compat'
        //}

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
                test: /\.(pug|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer(
            //    { browsers: ['ie 10', 'firefox 20', 'safari 9.1','Chrome ] }
            { browsers: ['> 0%'] }
        )];
    }
};