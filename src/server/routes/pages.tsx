/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { renderFile } from 'pug';
import { Provider } from 'react-redux';
import * as path from 'path'
import store from "../../client/reducers/index";
//import { addName, addEmail } from "../../client/actions/userAction"
import { ContactWithData, DateTimeWithData, LoginWithData, ReviewsWithData, SignupWithData } from "../../client/index";


//// create mongoose schema
//const userSchema = new mongoose.Schema({
//    name: String,
//    age: Number
//});
//
//// create mongoose model
//const User = mongoose.model('User', userSchema);

export function pages(router) {
    router.get('/', function (req: any, res: any) {
        if (req && req.session && req.session.passport && req.session.passport.user) {
        //    store().dispatch(addName(req.session.passport.user.name))
        //    store().dispatch(addEmail(req.session.passport.user.email))
        }
        let preloadedState = store().getState();
        let contactString = ReactDOMServer.renderToString(ContactWithData());
        let datetimeString = ReactDOMServer.renderToString(DateTimeWithData());
        console.log("contact app: " + contactString);
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
        let loginString = ReactDOMServer.renderToString(LoginWithData());
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
        let signupString = ReactDOMServer.renderToString(SignupWithData());
        let locals = { signup: signupString, preloadedState: preloadedState };
        let html = renderFile(path.join(__dirname, "..", "pug/signup.pug"), locals);
        res.send(html);
    });
}
