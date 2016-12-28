import * as React from 'react';
import * as reactDOM from "react-dom";
import { ContactWithData, DateTimeWithData, ReviewsWithData } from "../client/index";
require("./utils/pageScroll");
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./sass/site.scss";
import "animate.css";

$(document).ready(function () {
    reactDOM.render(
        ContactWithData(),
        document.getElementById("react-contact")
    );
    reactDOM.render(
        <img className="img-responsive" alt="Broom" src={require("./images/broomCrop.png")}/>,
        document.getElementById("react-broom")
    );
    reactDOM.render(
        DateTimeWithData(),
        document.getElementById("react-datetime")
    );
    reactDOM.render(
        ReviewsWithData(),
        document.getElementById("react-reviews")
    );

});

