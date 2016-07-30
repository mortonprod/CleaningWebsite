import { Component, ViewChildren,QueryList, AfterViewInit,Output} from '@angular/core';
import { AppState } from '../app.service';
import { sqr } from './sqr';

@Component({
    selector: 'cleanFloor',  // <home></home>
    providers: [
    ],
    directives: [sqr],
    pipes: [],
    styleUrls: ['./cleanFloor.style.css'],
    templateUrl: './cleanFloor.template.html'
})

export class cleanFloor implements AfterViewInit {
    private xDiv = 4;
    private yDiv = 6;
    @ViewChildren(sqr) sqrList: QueryList<sqr>;
    // Set our default values
    localState = { value: '' };
    // TypeScript public modifiers
    //constructor(public appState: AppState, public xDiv = 3, public yDiv = 3) {}
    constructor() {
        console.log("Clean floor constructor.");
    }
    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        console.log("View children: " + this.sqrList);
        let sqrNum: number = this.sqrList.length;
        ///A simple test to make sure the number of sqrs added is enough to make up the divisions specified.
        console.log("sqrNum and xDiv*yDiv: " + sqrNum + ' ' + this.xDiv*this.yDiv)
        if (sqrNum !== this.xDiv * this.yDiv) {
            throw new Error("Can't make sqr grid.");
        }
    }
    ngOnInit() {
        console.log('hello `cleanFloor` component');
        // this.title.getData().subscribe(data => this.data = data);
    }

    submitState(value) {
        //console.log('submitState', value);
        //this.appState.set('value', value);
        //this.localState.value = '';
    }
    click() {
        this.init();
    }
    init() {
        let fracWidthCon = 100 / this.xDiv;
        let fracHeightCon = 100 / this.yDiv
        let xPos = 0;
        let yPos = 0;
        let color1 = "white";
        let color2 = "black"
        this.sqrList.forEach((sqr, index) => {
            ///Once you reach the beginning of new line.
            if (index % this.xDiv === 0 && index !== 0) {
                xPos = 0;
                yPos++;
                let colorTemp = color1;
                color1 = color2;
                color2 = colorTemp;
            }
            sqr.setDimensions(fracWidthCon * xPos + "%", fracHeightCon * yPos + "%", fracWidthCon + "%", fracHeightCon + "%")
            if (xPos % 2 === 0) {
                sqr.setColor(color1);
            } else {
                sqr.setColor(color2);
            }
            xPos++;
        });
    }

}

