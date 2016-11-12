﻿/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
///Get all pug file ready to render
var indexPug = require("./pug/index.pug");
///Contains all the components we want to render.
import {ContactRoot,store} from "../../client/index";
var contactApp = React.createFactory(ContactRoot)
const preloadedState = store.getState();
export function pages(router) {
    router.get('/', function (req: any, res: any) {
        if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.pass) {
            var contactString = ReactDOMServer.renderToString(contactApp({}, req.session.passport.user));
            let locals = { name: req.session.passport.user.name, contact: contactString, preloadedState: preloadedState };
            let html = indexPug(locals);
            res.send(html);
        } else {
            var locals = {contact: contactString, preloadedState: preloadedState };
            let html = indexPug(locals);
            res.send(html);
        }
    });
    router.get('/login', function (req: any, res: any) {
        res.render('login');
    });
    router.get('/logout', function (req: any, res: any) {
        req.logout();
        res.redirect("/");
    });
    router.get('/signup', function (req, res) {
        res.render('signup', { name: 'Alex' });
    });

}