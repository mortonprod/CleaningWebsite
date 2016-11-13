/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { renderFile } from 'pug';
import { Provider } from 'react-redux';
import * as path from 'path'

///Get all pug file ready to render
///Contains all the components we want to render.
import store from "../../client/reducers/index";
import Contact from "../../client/containers/contact";

const contactApp = (
<Provider store={ store() } >
    <Contact/>
</Provider> 
)


//var contactApp = React.createFactory(initialContact)
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
        let contactString = ReactDOMServer.renderToString(contactApp);
        let locals = { contact: contactString, preloadedState: preloadedState };
        console.log("PUG PATH " + path.join(__dirname,"..", "pug/index.pug"));
        let html = renderFile(path.join(__dirname, "..", "pug/index.pug"), locals);
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
