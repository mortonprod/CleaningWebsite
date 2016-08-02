import { Component, OnInit } from '@angular/core';
import { cleanCarousel } from './cleanCarousel'
import { cleanRate } from './cleanRate'
import { booking } from './booking'
import { auth } from './auth'


@Component({
    selector: 'mainPage',
    providers: [
    ],
    directives: [cleanCarousel, cleanRate, booking,auth],
    pipes: [],
    templateUrl: './mainPage.template.html'
})

export class mainPage implements OnInit {
    ngOnInit() {
    }
}