import * as React from 'react';
import * as Datetime from "react-datetime";
//import * as moments from 'moment';
interface state {
    day:string,
    month: string,
    hour: string,
    minutes:string
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
            hour: moment.hour(),
            minutes: moment.minutes()
        })
    }
    valid(current:any) {
        return current.day() !== 0 && current.day() !== 6;
    };
    componentWillMount() {
        this.setState({
            day: "",
            month: "",
            hour: "",
            minutes: ""
        })
    }
    submitHandler() {
    }
    addHandler() {
        this.setState({
            day: "",
            month: "",
            hour: "",
            minutes: ""
        })
    }
    render() {
        let curDis
        if (this.state.day !== "") {
            curDis = (
                <div>
                    <h5> Day: {this.state.day} Month: {this.state.month}</h5>
                    <h5> Hour: {this.state.hour} Min: {this.state.minutes} </h5>
                </div>
            )
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
                </div>
                <div className="col-lg-4">
                    <h3><span className="glyphicon glyphicon-thumbs-up"></span> Submit</h3>
                    <button onClick={this.submitHandler.bind(this)} className='btn btn-lg btn-primary btn-block'> Submit </button>
                </div>
            </div>
        );
    }
}
