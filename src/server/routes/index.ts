/// <reference path="../../../typings/index.d.ts" />
import * as express from 'express';
import * as path from 'path'
import { post } from "./post";
import { pages } from "./pages";
module.exports = function (app: any, passport: any) {
    var router = express.Router();
    post(router, passport);
    pages(router);
    app.use('/', router);
};