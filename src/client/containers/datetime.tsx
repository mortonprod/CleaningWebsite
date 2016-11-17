import * as React from 'react';
import * as Datetime from "react-datetime";
//import * as moments from 'moment';
interface state {
    day: string,
    month: string,
    year: string,
    hour: string,
    minutes: string,
    listOfDates: Array<string>
}
interface props {
}

//Should pick multiple days and a certain time. >> add submit button which will take changed time.
//Duration of time spent.  >> can add another field for time needed.
//Show the dates and time not available. >> add another field for taking times on that day.
export default class DateTime extends React.Component<props, state> {
    constructor(props: any) {
        super(props);
    }

    //Steps of two hours 9am min 3pm max.
    con = { hours: { min: 9, max: 15, step: 2 } }
    dateChange(moment: any) {
        this.setState({
            day: moment.date(),
            month: moment.month(),
            year: moment.year(),
            hour: moment.hour(),
            minutes: moment.minutes(),
            listOfDates: this.state.listOfDates
        })
    }
    valid(current: any) {
        return current.day() !== 0 && current.day() !== 6;
    };
    componentWillMount() {
        this.setState({
            day: "",
            month: "",
            year: "",
            hour: "",
            minutes: "",
            listOfDates: []
        })
    }
    submitHandler() {
    }
    addHandler() {
        let list:any
        if (this.state.day !== "") {
            let datetime = this.state.day + "/" + this.state.month + "/" + this.state.year + "  " + this.state.hour + ":" + this.state.minutes
            list = this.state.listOfDates.concat(datetime);
        } else {
            list = this.state.listOfDates;
        }
        this.setState({
            day: "",
            month: "",
            year: "",
            hour: "",
            minutes: "",
            listOfDates: list
        })
    }
    render() {
        let curDis: any
        if (this.state.day !== "") {
            curDis = (
                <div>
                    <h5> {this.state.day}/{this.state.month}/{this.state.year}</h5>
                    <h5> {this.state.hour}: {this.state.minutes} </h5>
                </div>
            )
        }
        console.log("length: " + this.state.listOfDates.length);

        var list: Array<any> = [];
        for (let i = 0; i < this.state.listOfDates.length; i++) {
            console.log(this.state.listOfDates[i]);
            list.push(
                <div>
                    <h5> {this.state.listOfDates[i]} </h5>
                </div>
            );
        }

        return (
            <div className="row height text-center">
                <div className="col-lg-4">
                    <h3><span className="glyphicon glyphicon-ok"></span> Add</h3>
                    {curDis}
                    <button onClick={this.addHandler.bind(this)} className='btn btn-lg btn-primary btn-block'> Add </button>
                    <Datetime onChange={this.dateChange.bind(this)} isValidDate={this.valid} timeConstraints={this.con}/>
                </div>
                <div className="col-lg-4">
                    <h3><span className="glyphicon glyphicon-list"></span> Check</h3>
                    {list}
                </div>
                <div className="col-lg-4">
                    <h3><span className="glyphicon glyphicon-thumbs-up"></span> Submit</h3>
                    <button onClick={this.submitHandler.bind(this)} className='btn btn-lg btn-primary btn-block'> Submit </button>
                </div>
            </div>
        );
    }
}
