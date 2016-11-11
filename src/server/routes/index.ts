/// <reference path="../../../typings/index.d.ts" />
import * as express from 'express';
import * as path from 'path'

var router = express.Router();

require(path.join(__dirname, './', 'contact'))(router);
require(path.join(__dirname, './', 'pages'))(router);


module.exports = function (app) {
    app.use('/', router);
};