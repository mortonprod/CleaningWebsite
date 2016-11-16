﻿import * as $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../sass/site.scss";
import * as React from 'react';
import { Component } from 'react';
import * as reactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store  from '../reducers/index';
import Login from "../containers/login";

$(document).ready(function () {
    reactDOM.render(
        <Provider store={store()} >
            <Login/>
        </Provider>,
        document.getElementById("react-login")
    );
});

