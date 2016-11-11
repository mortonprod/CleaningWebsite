/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../../../node_modules/react-datetime/react-datetime.d.ts" />
import * as React from 'react';
import * as Datetime from "react-datetime";
interface state {
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
    dateChange(date) {
    }
    valid(currentDate) {
        ///test date and return true if selectable
        return true;
    }
    componentDidMount() {
    }
    render() {
        return (
            <Datetime onChange={this.dateChange} isValidDate={this.valid} timeConstraints={this.con}/>
        );
    }
}
