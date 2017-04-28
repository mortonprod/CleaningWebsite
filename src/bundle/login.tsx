import * as $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./sass/site.scss";
import * as React from 'react';
import { Component } from 'react';
import * as reactDOM from "react-dom";
//import { LoginWithData} from "../client/index";


$(document).ready(function () {
    reactDOM.render(
        <div>Boom!</div>,
        document.getElementById("react-login")
    );
});


