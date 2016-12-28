/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import * as Datetime from "react-datetime";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sendBooking from '../actions/datetimeAction';

//var Spinner = require('react-spinkit');
interface state {
    currentMoment: moment.Moment,
    listOfMoments: Array<moment.Moment>
}
interface props {
    sending: Boolean,
    inValidDatesAndTimes: Array<moment.Moment>,
    yourDatesAndTimes: Array<moment.Moment>,
    sentSuccess: Boolean,
    sendBooking: any
}
/**
 * @class
 * Implementation of DateTime component
 */
class DateTime extends React.Component<props, state> {
    constructor(props: any) {
        super(props);
    }
    noTimes: Array<string> = [];
    //Steps of two hours 9am min 3pm max.
    con = { hours: { min: 9, max: 15, step: 2 } }
    /**
     * @function
     * Call when the date changes.
     * Check this date for all the times we can't use so we can render it.
     * @param moment
     */
    dateChange(moment: moment.Moment) {
        this.noTimes = [];
        console.log(moment.format('LLLL'));
        this.setState({
            currentMoment: moment,
            listOfMoments: this.state.listOfMoments
        })
        for (let i = 0; this.props.inValidDatesAndTimes.length; i++) {
            let momentStored: moment.Moment = this.props.inValidDatesAndTimes[i];
            if (momentStored.date() === moment.date() && momentStored.month() === moment.month() && momentStored.year() === moment.year()) {
                this.noTimes.push(moment.format("hh:mm:ss a"));
            }
        }
    }
    /**
     * Check the days which we can't use.
     * Return true on the days we want to keep
     * @param current
     */
    valid(current: moment.Moment) {
        if (typeof this.props.inValidDatesAndTimes !== "undefined" && this.props.inValidDatesAndTimes !== null ) {
            for (let i = 0; this.props.inValidDatesAndTimes.length; i++) {
                let momentStored: moment.Moment = this.props.inValidDatesAndTimes[i];
                if (current.day === momentStored.day && current.month !== momentStored.month && current.year !== momentStored.year) {
                    return false;
                }
            }
        }
        return true;
    }
    componentWillMount() {
        this.setState({
            currentMoment: null,
            listOfMoments: []
        })
    }
    submitHandler() {
        this.props.sendBooking(this.state.listOfMoments);
    }
    /**
     * @function
     * Call when we want to add a new date to the list.
     */
    addHandler() {
        let list: any
        if (this.state.currentMoment !== null) {
            list = this.state.listOfMoments.concat(this.state.currentMoment);
        } else {
            list = this.state.listOfMoments;
        }
        this.setState({
            currentMoment: null,
            listOfMoments: list
        })
    }
    render() {
        let comp: any;
        if (this.props.sending) {
        } else {
            let curDis: any
            if (this.state.currentMoment !== null) {
                curDis = (
                    <div>
                        <h5> {this.state.currentMoment.format('LLLL')} </h5>
                    </div>
                )
            }
            var list: Array<any> = [];
            for (let i = 0; i < this.state.listOfMoments.length; i++) {
                console.log(this.state.listOfMoments[i]);
                list.push(
                    <div>
                        <h5> {this.state.listOfMoments[i].format('LLLL')} </h5>
                    </div>
                );
            }
            var noTimesComp: Array<any> = [];
            for (let i = 0; i < this.noTimes.length; i++) {
                console.log(this.noTimes[i]);
                noTimesComp.push(
                    <div>
                        <h5> {this.noTimes[i]} </h5>
                    </div>
                );
            }
            comp = (
                <div className="row height text-center">
                    <div className="col-lg-4">
                        <h3><span className="glyphicon glyphicon-ok"></span> Add</h3>
                        {curDis}
                        <button onClick={this.addHandler.bind(this)} className='btn btn-lg btn-primary btn-block'> Add </button>
                        <Datetime onChange={this.dateChange.bind(this)} isValidDate={this.valid.bind(this)} timeConstraints={this.con}/>
                    </div>
                    <div className="col-lg-3">
                        <h3><span className="glyphicon glyphicon-remove-sign"></span>Not available</h3>
                        {noTimesComp}
                    </div>
                    <div className="col-lg-3">
                        <h3><span className="glyphicon glyphicon-list"></span> Check</h3>
                        {list}
                    </div>
                    <div className="col-lg-2">
                        <h3><span className="glyphicon glyphicon-thumbs-up"></span> Submit</h3>
                        <button onClick={this.submitHandler.bind(this)} className='btn btn-lg btn-primary btn-block'> Submit </button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {comp}
            </div>
        );
    }
}
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        sending: state.datetimeReducer.sendingBooking,
        sentSuccess: state.datetimeReducer.sentBooking,
        inValidDatesAndTimes: state.datetimeReducer.allDatesAndTimes,
        yourDatesAndTimes: state.datetimeReducer.yourDatesAndTimes
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        sendBooking: bindActionCreators(sendBooking, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DateTime);
