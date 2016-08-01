import { Component, OnInit } from '@angular/core';
import { jobsService,job } from '../../app.service';
@Component({
    selector: 'booking',
    providers: [jobsService],
    pipes: [],
    templateUrl: './booking.template.html'
})

export class booking implements OnInit {
    //TODO:Need to put private for this to work in getJobs? Why?
    jobs = new Array<job>();
    error = "";
    constructor(private jbServ: jobsService) {
    }
    ngOnInit() {
    }
    getJobs() {
        this.jbServ.getJobs().subscribe(jobs => this.jobs = jobs, error => this.error = <any>error);
    }
}