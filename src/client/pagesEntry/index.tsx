import * as $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../sass/site.scss";
import "animate.css";
import "../images/mudCrop.png";
import * as React from 'react';
import { Component } from 'react';
import * as reactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store from '../reducers/index';
import apps from "../containers/index";

//const createStoreWithMiddleware = applyMiddleware(
//    thunkMiddleware // lets us dispatch() functions
//)(createStore);
//
//const store = createStoreWithMiddleware(RootReducer, window.__PRELOADED_STATE__);

$(document).ready(function () {
    reactDOM.render(
        apps().contactApp,
        document.getElementById("react-contact")
    );
    reactDOM.render(
        <img className="img-responsive" alt="" src={require("../images/broomCrop.png")}/>,
        document.getElementById("react-broom")
    );
    reactDOM.render(
        apps().datetimeApp,
        document.getElementById("react-datetime")
    );
    reactDOM.render(
        apps().reviewsApp,
        document.getElementById("react-reviews")
    );

});

