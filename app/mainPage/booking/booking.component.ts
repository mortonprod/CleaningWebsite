import { Component, OnInit } from '@angular/core';
import { jobsService,job } from '../../app.service';
import { cleanTimePicker } from './cleanTimePicker'
import { datePicker } from './datePicker'
import { FORM_DIRECTIVES } from '@angular/forms';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap';
@Component({
    selector: 'booking',
    providers: [jobsService],
    pipes: [],
    directives: [cleanTimePicker, datePicker, BUTTON_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: './booking.template.html'
})

export class booking implements OnInit {
    //TODO:Need to put private for this to work in getJobs? Why?
    jobs = new Array<job>();
    error = "";
    minutes: number;
    hour: number;
    day: number;
    month: number;
    year: number;
    amOrPM = "PM";
    constructor(private jbServ: jobsService) {}
    ngOnInit() {}
    getJobs() {
        ///getjobs() will return map and catch which return date for you to subscribe to.
        /// output => this.jobs = =output : output is th return value of the function in map. 
        ///Same idea with error. 
        this.jbServ.getJobs().subscribe(output => this.jobs = output, output => this.error = <any>output);
    }
    timeChange(event) {
        this.minutes = event[0];
        this.hour = event[1];
        console.log(this.minutes + " " + this.hour);
    }
    dateChange(event) {
        this.day = event[0]
        this.month = event[1]
        this.year = event[2]
        console.log(this.day + " " + this.month + " " + this.year)
    }
    submit() {
        console.log("submit");
        let job = { "id":1,"name": "me", "minute": this.minutes, "hour": this.hour, "day": this.day,"month": this.month,"year": this.year }
        /// jbServ.addJob(job) : This part will store the value.
        ///Subscribe is to update the jobs after they have been stored. Same as above.
        this.jbServ.addJob(job).subscribe(output => this.jobs.push(output),output => this.error = <any>output);
    }
}