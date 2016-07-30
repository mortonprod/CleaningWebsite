import { Component } from '@angular/core';
import { AppState } from '../../app.service';

@Component({
    selector: 'sqr',  
    providers: [
    ],
    directives: [
    ],
    pipes: [],
    styleUrls: ['./sqr.style.css'],
    templateUrl: './sqr.template.html'
})

export class sqr {
    color = "red";
    width = "100px";
    height = "100px";
    left = "100px";
    top = "100px";

    // Set our default values
    localState = { value: '' };
    // TypeScript public modifiers
    constructor(public appState: AppState) {

    }

    ngOnInit() {
        console.log('hello `sqr` component');
        // this.title.getData().subscribe(data => this.data = data);
    }

    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }
    setColor(color:string) {
        this.color = color;
    }
    setDimensions(left: string, top: string, width: string, height: string) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

}

