﻿import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';
import { CAROUSEL_DIRECTIVES } from 'ng2-bootstrap';

@Component({
    selector: 'cleancarousel',
    directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: './cleanCarousel.template.html'

})
export class cleanCarousel {
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public slides: Array<any> = [];

    public constructor() {
        for (let i = 0; i < 2; i++) {
            this.addSlide();
        }
    }

    public addSlide(): void {
        let newWidth = 600 + this.slides.length + 1;
        this.slides.push({
            image: `//placekitten.com/${newWidth}/300`,
            text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
        });
    }

    public removeSlide(index: number): void {
        this.slides.splice(index, 1);
    }
}