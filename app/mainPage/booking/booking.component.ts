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
    constructor(private jbServ: jobsService) {
    }
    ngOnInit() {
    }
    getJobs() {
        this.jbServ.getJobs().subscribe(jobs => this.jobs = jobs, error => this.error = <any>error);
    }
    timeChange(event) {
        this.hour = event[1];
        this.minutes = event[0];
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
        this.jbServ.addJob(job).subscribe(jobs => this.jobs.push(job),error => this.error = <any>error);
        }
    }
}