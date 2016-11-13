/// <reference path="../../../typings/index.d.ts" />
import * as express from 'express';
import * as path from 'path'
import { post } from "./post";
import { pages } from "./pages";

var router = express.Router();
post(router);
pages(router);

module.exports = function (app:any) {
    app.use('/', router);
};