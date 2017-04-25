/**
 * @file
 * This part creates the bundle passed to the client.
 * We add the css for the components here since the server can't parse this correctly on the server.
 * We can initialise the store using the data got from the server and passed to window object.
 * Each component will get rendered to id location specified in html template.
 * Service worker started to save and precache routes.
 */
import * as React from 'react';
import * as reactDOM from "react-dom";
import { Provider, connect } from 'react-redux';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { match, Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Routes, RootReducer } from "../client/index";
import thunkMiddleware from 'redux-thunk';
require("./utils/pageScroll");
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./sass/site.scss";
import "animate.css";

$(document).ready(function () {
    let initial: any;
    //Make sure we have this information.
    if (typeof window !== "undefined" && typeof window.__REDUX_STATE__ !== "undefined") {
        initial = window.__REDUX_STATE__
        console.log("Initial state: " + JSON.stringify(initial))
    } else {
        throw("No state found on client")
    }
    const store = createStore(RootReducer, initial, applyMiddleware(thunkMiddleware))
    const history = syncHistoryWithStore(browserHistory, store);///This creates the actions which will attach to routing in combined reducer.
    history.listen(location => console.log("client location event: " + location.pathname)); ///This connects to navigation events.
    reactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                Routes()
            </Router>
        </Provider>,
        document.getElementById("react-router")
    )

});

$(document).ready(function () {
//    match({ history: browserHistory, routes:Routes() } as any, (error, redirectLocation, renderProps) => {
//
//        // Get initial state from window and configure initial state (just like the server)
//        const initial = window.__REDUX_STATE__;
//        const store = createStore(RootReducer, initial, applyMiddleware(thunkMiddleware))
//        console.log("Store :" + store + "  " + initial)
//        reactDOM.render(
//            <Provider store={store}>
//                <div>
//                    <Router {...renderProps} />
//                </div>
//            </Provider>,
//            document.getElementById('react-router')
//        );
//    });

//  reactDOM.render(
//      <div>Hello</div>,
//      document.getElementById('react-router')
//  );

})

//if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('/bundle/service-worker.js').then(function (registration) {
//        // Registration was successful
//        console.log('ServiceWorker registration successful with scope: ', registration.scope);
//    }).catch(function (err) {
//        // registration failed :(
//        console.log('ServiceWorker registration failed: ', err);
//    });
//}
