import "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./sass/site.scss";
import * as React from 'react';
import { Component } from 'react';
import * as reactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store  from './reducers/index';
import Contact from "./containers/contact";
//const createStoreWithMiddleware = applyMiddleware(
//    thunkMiddleware // lets us dispatch() functions
//)(createStore);
//
//const store = createStoreWithMiddleware(RootReducer, window.__PRELOADED_STATE__);
reactDOM.render(
    <Provider store={store()} >
        <Contact/>
    </Provider>,
    document.getElementById("contact")
);



