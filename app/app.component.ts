import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
///routerLinkActive is the style of the link once it is active.
///nav is a list of hyperlinks specified by a.
///ul is unnordered list with element li. 
///TODO:Seems strange to have these together but this was what was done in template.
///Icon-bar is the line in the collapsed drop menu.
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.style.css'],
    template: `
    <main>
      <nav class="navbar navbar-default navbar-fixed-top navbar-custom">
        <div class="navbar-header page-scroll">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" routerLink="/about" routerLinkActive="active">Clement Cleaning</a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="#" routerLink="/about" routerLinkActive="active">About Us</a>
                </li>
                <li>
                    <a href="#" routerLink="/cleanCarousel" routerLinkActive="active">In action</a>
                </li>
                <li>
                    <a href="#" routerLink="/booking" routerLinkActive="active">Booking</a>  
                </li>
            </ul>
        </div>
      </nav>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
    cleaningLogo = 'assets/img/broomCrop.png';
    name = 'Cleaning Website';
    url = 'https://facebook.com/cleaning';

    constructor(
        public appState: AppState) {

    }
    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

}
