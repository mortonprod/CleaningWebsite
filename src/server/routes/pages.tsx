/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../client/components/contact/index.tsx" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { renderFile } from 'pug';
import { Provider } from 'react-redux';
//import { match, Router, Route, IndexRoute, browserHistory, createMemoryHistory, RouterContext } from 'react-router';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
//import createHistory from 'react-router/lib/createMemoryHistory';
import thunkMiddleware from 'redux-thunk';
import * as path from 'path'
import * as fs from "fs";
import { Routes, RootReducer } from "../../client/index";

export function pages(router) {

    router.get('/*', function (req: any, res: any,next) {
        let initial = {};
        //const memoryHistory = createHistory(req.url);
        const store = createStore(RootReducer, initial, applyMiddleware(thunkMiddleware))
        res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                  <link rel="stylesheet" href="/bundle/site.css">
                </head>
                <body>
                  <div id="react-router"></div>
                  <script src="/bundle/vendor.bundle.js"></script>
                  <script src="/bundle/index.js"></script>
                </body>
                </html>`
        )
        //const history = syncHistoryWithStore(memoryHistory, store);
        //match({ history, routes: Routes(), location: req.url }, (error, redirectLocation, renderProps) => {
        //    console.log("Match " + req.url + "  " + renderProps)
        //    if (renderProps) {///Stupid since passed in when matched to /
        //        console.log("Comp " + req.url + "  " + renderProps)
        //        const body = ReactDOMServer.renderToString(
        //            <Provider store={store}>
        //                <div>
        //                    <RouterContext {...renderProps} />
        //                </div>
        //            </Provider>
        //        )
        //        console.log("Body:");
        //        console.log(body);
        //        const state = store.getState()
        //        res.send(`
        //        <!DOCTYPE html>
        //        <html>
        //        <head>
        //          <link rel="stylesheet" href="/bundle/site.css">
        //        </head>
        //        <body>
        //          <div id="react-router">${body}</div>
        //          <script>window.__REDUX_STATE__ = ${JSON.stringify(state)}</script>
        //          <script src="/bundle/vendor.bundle.js"></script>
        //          <script src="/bundle/index.js"></script>
        //        </body>
        //        </html>`
        //        )
        //    } else {
        //        next()
        //    }
        //})
        //}
    })
}
