/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { renderFile } from 'pug';
import { Provider } from 'react-redux';
import * as path from 'path'

import store from "../../client/reducers/index";

import Contact from "../../client/containers/contact";
import Login from "../../client/containers/login";
import Signup from "../../client/containers/signup";



const contactApp = (
<Provider store={ store() } >
    <Contact/>
</Provider> 
)

const loginApp = (
    <Provider store={store()} >
        <Login/>
    </Provider>
)

const signupApp = (
    <Provider store={store()} >
        <Signup/>
    </Provider>
)

//var contactApp = React.createFactory(initialContact)
const preloadedState = store().getState();
export function pages(router) {
    router.get('/', function (req: any, res: any) {
        let contactString = ReactDOMServer.renderToString(contactApp);
        let locals = null;
        if (preloadedState.userReducer.name !=="") {
            locals = { name: preloadedState.userReducer.name, contact: contactString, preloadedState: preloadedState };
        } else {
            locals = { contact: contactString, preloadedState: preloadedState };
        }
        let html = renderFile(path.join(__dirname, "..", "pug/index.pug"), locals);
        res.send(html);
    });
    router.get('/login', function (req: any, res: any) {
        let loginString = ReactDOMServer.renderToString(loginApp);
        let locals = { login: loginString, preloadedState: preloadedState };
        let html = renderFile(path.join(__dirname, "..", "pug/login.pug"), locals);
        res.send(html);
    });
    router.get('/logout', function (req: any, res: any) {
        req.logout();
        res.redirect("/");
    });
    router.get('/signup', function (req, res) {
        let signupString = ReactDOMServer.renderToString(signupApp);
        let locals = { signup: signupString, preloadedState: preloadedState };
        let html = renderFile(path.join(__dirname, "..", "pug/signup.pug"), locals);
        res.send(html);
    });
}
