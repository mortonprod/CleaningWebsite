/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { renderFile } from 'pug';
import { Provider } from 'react-redux';
import * as path from 'path'

import store from "../../client/reducers/index";
import { addName, addEmail } from "../../client/actions/userAction"
import Contact from "../../client/containers/contact";
import Login from "../../client/containers/login";
import Signup from "../../client/containers/signup";
import DateTime from "../../client/containers/datetime";



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
const datetimeApp = (
    <Provider store={store()} >
        <DateTime/>
    </Provider>
)

export function pages(router) {
    router.get('/', function (req: any, res: any) {
        if (req && req.session && req.session.passport && req.session.passport.user) {
            store().dispatch(addName(req.session.passport.user.name))
            store().dispatch(addEmail(req.session.passport.user.email))
        }
        let preloadedState = store().getState();
        let contactString = ReactDOMServer.renderToString(contactApp);
        let datetimeString = ReactDOMServer.renderToString(datetimeApp);
        let locals = null;
        if (preloadedState.userReducer.name !=="") {
            locals = { name: preloadedState.userReducer.name, contact: contactString, preloadedState: preloadedState };
        } else {
            locals = {datetime:datetimeString, contact: contactString, preloadedState: preloadedState };
        }
        let html = renderFile(path.join(__dirname, "..", "pug/index.pug"), locals);
        res.send(html);
    });
    router.get('/login', function (req: any, res: any) {
        let preloadedState = store().getState();
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
        let preloadedState = store().getState();
        let signupString = ReactDOMServer.renderToString(signupApp);
        let locals = { signup: signupString, preloadedState: preloadedState };
        let html = renderFile(path.join(__dirname, "..", "pug/signup.pug"), locals);
        res.send(html);
    });
}
