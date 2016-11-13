/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { renderFile } from 'pug';
///Get all pug file ready to render
///Contains all the components we want to render.
import store from "../../client/reducers/index";
import  Contact  from "../../client/containers/contact";

var contactApp = React.createFactory(Contact)
const preloadedState = store().getState();
export function pages(router) {
    router.get('/', function (req: any, res: any) {
//        if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.pass) {
//            let contactString = ReactDOMServer.renderToString(contactApp({}, req.session.passport.user));
//            let locals = { name: req.session.passport.user.name, contact: contactString, preloadedState: preloadedState };
//            let html = renderFile("../pug/index.pug", locals);
//            res.send(html);
//        } else {
//            let locals = {contact: contactString, preloadedState: preloadedState };
//            let html = renderFile("../pug/index.pug", locals);
//            res.send(html);
//        }
        let contactString = ReactDOMServer.renderToString(contactApp());
        let locals = {preloadedState: preloadedState };
        let html = renderFile("../pug/index.pug", locals);
        res.send(html);
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
