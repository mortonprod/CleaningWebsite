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
    xDiv = 4;
    yDiv = 6;
    pos = new Array<Array<string>>();
    cleanNum = 5;
    imgPos = new Array<string>();
    isSweep = false;
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
    ///TODO:Note all async calls are all made at once.
    ///TODO:All asynchronous call must take into account the timing of css. There transitions are all 1s.
    click() {
        let wait = 1000;
        let time = 3000;
        this.init();
        ///Wait some time before you start.
        setTimeout(() => {
            for (let i = 1; i < this.cleanNum; i++) {
                let randNum = Math.floor(Math.random() * this.sqrList.length);
                ///Expose dirty sqr. Takes a second to expose.
                setTimeout((i) => {///time=>3,6,9
                    this.sqrList.toArray()[randNum].setOpacity(1);
                }, (time*i));
                ///Change the position after a second.
                setTimeout((i) => {///time=>4,7,10
                    this.imgPos = this.pos[randNum];
                    console.log("ImgPos: " + this.imgPos)
                }, (time * i)+1000);
                ///After 1s after the call to move the animation should be in the right position.
                setTimeout((i) => {///time=>5,8,11
                    this.isSweep = true;
                    this.sqrList.toArray()[randNum].setOpacity(0);
                }, (time * i) + 2000);
                ///Stop sweep after another second and in time to begin to expose another mud sqr.
                setTimeout((i) => {//time=>6,9,12
                    this.isSweep = false;
                }, (time * i) + time);
            }
        }, wait)
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
            this.pos.push([fracWidthCon * xPos + "%", fracHeightCon * yPos + "%"]);
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

