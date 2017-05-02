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
import { BrowserRouter } from "react-router-dom";
import { Provider, connect } from 'react-redux';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { match, Router, Route } from 'react-router';
import { routerReducer } from 'react-router-redux'
import { Routes, Navigation, RootReducer } from "../client/index";
//require("./utils/pageScroll");
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';
//import "./sass/site.scss";
//import "animate.css";

//document.addEventListener("DOMContentLoaded", function (event) { 
// Get initial state from window and configure initial state (just like the server)
const initial = window.__REDUX_STATE__;
console.log("Run the app from bundle.")
console.log(document.getElementById('react-router'));
function Test() { return (<div>test here</div>) }
function test2() { return (<div>test2</div>) }
//reactDOM.render(
//    <Provider>
//        <BrowserRouter>
//            <Route exact path="/" component={test} />
//        </BrowserRouter>
//    </Provider>,
//    document.getElementById('react-router')
//);
reactDOM.render(
    <Test/>,
    document.getElementById('react-router')
);
//reactDOM.render(
//    <div>hello</div>,
//    document.getElementById('react-router')
//);

//reactDOM.render(
//    <Navigation />,
//    document.getElementById('react-nav')
//);
//})

//if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('/bundle/service-worker.js').then(function (registration) {
//        // Registration was successful
//        console.log('ServiceWorker registration successful with scope: ', registration.scope);
//    }).catch(function (err) {
//        // registration failed :(
//        console.log('ServiceWorker registration failed: ', err);
//    });
//}
