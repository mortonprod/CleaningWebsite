/// <reference path="../../client/components/contact/index.tsx" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux';
import { match, Router, Route, StaticRouter } from 'react-router';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux'
import * as path from 'path'
import * as fs from "fs";
import { Routes, RootReducer } from "../../client/index";

export function pages(router) {

    router.get('/*', function (req: any, res: any, next) {
        let initial = {};
        const body = ReactDOMServer.renderToString(
            <Provider>
                <StaticRouter location={req.url}>
                    Routes()
                </StaticRouter>
            </Provider>
        )
        console.log("Body:");
        console.log(body);
        //const state = store.getState()
        const state = {};
        res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                  <link rel="stylesheet" href="/bundle/site.css">
                </head>
                <body>
                  <div id="react-router">${body}</div>
                  <script>window.__REDUX_STATE__ = ${JSON.stringify(state)}</script>
                  <script src="/bundle/vendor.bundle.js"></script>
                  <script src="/bundle/index.js"></script>
                </body>
                </html>`
        )
    });
}
