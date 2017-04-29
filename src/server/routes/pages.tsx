/// <reference path="../../client/components/contact/index.tsx" />
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux';
import { match, Router, Route, StaticRouter } from 'react-router';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux'
import  thunkMiddleware  from 'redux-thunk'
import * as path from 'path'
import * as fs from "fs";
import { Routes, Navigation, RootReducer } from "../../client/index";

export function pages(router) {

    router.get('/*', function (req: any, res: any, next) {
        let initial = {};
        const store = createStore(RootReducer, initial, applyMiddleware(thunkMiddleware))
        const body = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <Routes/>
                </StaticRouter>
            </Provider>
        )
        const nav = ReactDOMServer.renderToString(
            <Navigation/>
        )

        console.log("Body:");
        console.log(body);
        //const state = store.getState()
        const state = {};
        res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>Clement Cleaning</title>
                  <meta name="description" content="A cleaning business">
                  <meta name="author" content="Mortonproductions">
                  <script src="/bundle/bootstrap.js"></script>
                  <link rel="stylesheet" href="/bundle/site.css">
                </head>
                <body>
                  <header>
                    <h1>
                        Clement Cleaning
                    </h1>
                    <h2>
                        A cleaning business based in Loch Lomond
                    </h2>
                  </header>
                  <nav>
                    <div id="react-nav">${nav}</div>
                  </nav>
                  <section>
                    <div id="react-router">${body}</div>
                  </section>
                  <footer>
                     Progressive web app produced my morton productions 
                  </footer>
                  <script>window.__REDUX_STATE__ = ${JSON.stringify(state)}</script>
                  <script src="/bundle/vendor.bundle.js"></script>
                  <script src="/bundle/index.js"></script>
                </body>
                </html>`
        )
    });
}
