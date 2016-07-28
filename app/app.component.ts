import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.style.css'
    ],
    template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
    cleaningclassLogo = 'assets/img/angularclass-avatar.png';
    name = 'Cleaning Website';
    url = 'https://facebook.com/cleaning';

    constructor(
        public appState: AppState) {

    }
    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

}
