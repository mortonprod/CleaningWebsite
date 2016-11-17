import * as $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../sass/site.scss";
import "../images/mudCrop.png";
import * as React from 'react';
import { Component } from 'react';
import * as reactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store  from '../reducers/index';
import Contact from "../containers/contact";
import DateTime from "../containers/datetime";
import Reviews from "../containers/reviews";

//const createStoreWithMiddleware = applyMiddleware(
//    thunkMiddleware // lets us dispatch() functions
//)(createStore);
//
//const store = createStoreWithMiddleware(RootReducer, window.__PRELOADED_STATE__);

$(document).ready(function () {
    reactDOM.render(
        <Provider store={store()} >
            <Contact/>
        </Provider>,
        document.getElementById("react-contact")
    );
    reactDOM.render(
        <img className="img-responsive" alt="" src={require("../images/broomCrop.png")}/>,
        document.getElementById("react-broom")
    );
    reactDOM.render(
        <DateTime/>,
        document.getElementById("react-datetime")
    );
    reactDOM.render(
        <Provider store={store()} >
            <Reviews/>
        </Provider>,
        document.getElementById("react-reviews")
    );

});

