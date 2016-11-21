import * as React from 'react';
///import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group') // ES5 with npm
const Rating = require('react-rating');
import "animate.css"
//import 'react-bootstrap-star-rating/example/star-rating.min.css';
interface state {
}
interface review { name: string, stars: number, message: string }
interface props {
    reviews: Array<review>,
    submit: any,
    titleStyle?: string,
    initialStars?: number,
    moreHandler?: Function,
    showHandler?:Function
}

export default class Reviews extends React.Component<props, state> {
    constructor(props: any) {
        super(props);
    }
    noMoreReviews = false;
    static defaultProps = {
        reviews: [] as any,
        submit: null as any,
        titleStyle: "",
        initialStars: 5,
        moreHandler: null as any
    }
    ctrls: {
        message?: HTMLTextAreaElement;
    } = {};
    componentWillMount() {
    }
    submitHandler() {
    }
    rateChange(rate: number) {
        console.log("rate change " + rate)
    }
    addHandler() {
    }
    moreHandler() {
        if (typeof this.props.showHandler !== "undefined") {
            this.props.showHandler(true)
        }
    }
    lessHandler(){
        if (typeof this.props.showHandler !== "undefined") {
            this.props.showHandler(false)
        }
    }
    componentWillUpdate(nextProps: props, nextState:state){
        //console.log("before/after :" + nextProps.reviews.length + " " + this.props.reviews.length);
        //if(nextProps.reviews.length === this.props.reviews.length){
        if(nextProps.reviews.length > 10){
            this.noMoreReviews = true;
        }else{
            this.noMoreReviews = false;
        }
    }   
    render() {
        let moreLess:any;
        if(this.noMoreReviews){
            moreLess = (
                <div>
                    <h2>No More Reviews</h2>
                    <button onClick={this.lessHandler.bind(this)} className="btn btn-success btn-lg">See Fewer Reviews</button>
                </div>
            )
        }else{
            moreLess = (
                <div>
                    <button onClick={this.moreHandler.bind(this)} className="btn btn-success btn-lg">See More Reviews</button>
                    <button onClick={this.lessHandler.bind(this)} className="btn btn-success btn-lg">See Fewer Reviews</button>
                </div>
            )
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
        console.log("style: " + this.props.titleStyle);
        console.log("initial stars: " + this.props.initialStars);
        return (
            <div  className="row text-center">
                <h1 className={this.props.titleStyle}>Give us a review</h1>
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
                            <button onClick={this.submitHandler.bind(this)} className="btn btn-success btn-lg">Send!!!</button>
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
