import * as React from 'react';
//import styleable from '../utils/myStyleable/index';
///import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group') // ES5 with npm
const Rating = require('react-rating');
import "animate.css"
//const css = require("./reviews/index.css");
//import 'react-bootstrap-star-rating/example/star-rating.min.css';
interface state {
}
interface review { name: string, stars: number, message: string }
/**
 * @interface
 * @params {Object} reviews A list of the reviews to show.
 * @params {Function} submit Pass a single review of the same format.
 * @params {string} title This is the title. 
 * @params {string} titleStyle Add new styles to title.
 * @params {number} initialStars Initial stars on review to submit.
 * @params {Function} showHandler Ask for more reviews.
 * @params {Boolean} showMoreButton Should we show the more button?
 * @params {Boolean} showFewerButton Should we show the fewer button?
 */
interface props {
    reviews?: Array<review>,
    submit?: any,
    userName?:string,
    title?:string,
    titleStyle?: string,
    initialStars?: number,
    showHandler?: Function,
    showMoreButton?: Boolean,
    showFewerButton?: Boolean
}
/**
 * @class
 * This presentational class will present all the reviews given to it.
 * Can easily update styles and what each part says. 
 * Attach callback function to give actions to each button.
 */
export  default class Reviews extends React.Component<props, state> {
    constructor(props: any) {
        super(props);
    }
    static defaultProps = {
        reviews: [] as any,
        submit: null as any,
        username:"Stranger",
        title: "Reviews",
        titleStyle: "",
        initialStars: 5,
        showHandler: null as any,
        showMoreButton: true,
        showFewerButton:true
    }
    ctrls: {
        message?: HTMLTextAreaElement;
    } = {};
    /**
     * @function
     * Submit function which will connect to props function or perform default behaviour
     */
    submit(rev: review) {
        if (typeof this.props.submit !== null) {
            this.props.submit(rev)
        } else {
            console.log("You need to add submit handler.")
        }
    }
    rateChange(rate: number) {
        console.log("rate change " + rate)
    }
    showHandler(more: Boolean) {
        console.log("show handler: " + more + "   " + this.props.showHandler);
        if (this.props.showHandler !== null) {
            this.props.showHandler(more)
        } else {
            console.log("You need to add show handler.")
        }
    }  
    render() {
        let moreLess: any;
        if (this.props.showMoreButton === true) {
            if (this.props.showFewerButton === true) {
                moreLess = (
                    <div>
                        <button onClick={() => { this.showHandler(true) } } className="btn btn-success btn-lg">More</button>
                        <button onClick={() => { this.showHandler(false) } } className="btn btn-success btn-lg">Fewer</button>
                    </div>
                )
            } else {
                moreLess = (
                    <div>
                        <button onClick={() => { this.showHandler(false) } } className="btn btn-success btn-lg">Fewer</button>
                    </div>
                )
            }
        }else{
            if (this.props.showFewerButton === true) {
                moreLess = (
                    <div>
                        <button onClick={() => { this.showHandler(false) } } className="btn btn-success btn-lg">Fewer</button>
                    </div>
                )
            } else {
                moreLess = (
                    <div>
                    </div>
                )
            }
        }


        var list: Array<any> = [];
        for (let i = 0; i < this.props.reviews.length; i++) {
            list.push(
                <div className="panel panel-primary" key={i}>
                    <div className="panel-heading">
                        <h4>{this.props.reviews[i].name} </h4>
                        <h2><Rating readonly={true} initialRate={this.props.reviews[i].stars} empty={"noVis glyphicon glyphicon-heart"} scale={5} full={"red glyphicon glyphicon-heart"}/></h2>
                    </div>
                    <div className="panel-body">
                        <p>{this.props.reviews[i].message}</p>
                    </div>
                </div>
            );
        }
        return (
            <div  className="row text-center">
                <h1 className={this.props.titleStyle}>{this.props.title}</h1>
                <form name="sentMessage" id="contactForm" noValidate>
                    <div className="row control-group">
                        <div className="form-group col-xs-12 floating-label-form-group controls">
                            <label>Message</label>
                            <textarea ref={(input) => this.ctrls.message = input} defaultValue="" rows={5} className="form-control" placeholder="Review" id="message" required data-validation-required-message="Please enter a review."></textarea>
                            <h2><Rating initialRate={this.props.initialStars} onChange={this.rateChange.bind(this)} placeholder={"noVis"}  empty={"black glyphicon glyphicon-heart"} scale={5} full={"red glyphicon glyphicon-heart"}/></h2>
                        </div>
                    </div>
                    <br/>
                    <div id="success"></div>
                    <div className="row">
                        <div className="col-xs-12">
                            <button onClick={() => { this.submit }} className="btn btn-success btn-lg">Send!!!</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="panel-group">
                        <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            {list}
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="col-xs-12">
                        {moreLess}
                    </div>
                </div>
            </div>
        );
    }
}
