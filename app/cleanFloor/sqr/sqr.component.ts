import { Component } from '@angular/core';
import { AppState } from '../app.service';

@Component({
    selector: 'cleanFloor',  // <home></home>
    providers: [
    ],
    directives: [
    ],
    pipes: [],
    styleUrls: ['./cleanFloor.style.css'],
    templateUrl: './cleanFloor.template.html'
})

export class cleanFloor {
    // Set our default values
    localState = { value: '' };
    // TypeScript public modifiers
    constructor(public appState: AppState) {

    }

    ngOnInit() {
        console.log('hello `cleanFloor` component');
        // this.title.getData().subscribe(data => this.data = data);
    }

    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }

}

