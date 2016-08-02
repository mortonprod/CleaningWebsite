import { Component,Output,EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';
import { TimepickerComponent } from 'ng2-bootstrap';

@Component({
    selector: 'cleantimepicker',
    directives: [TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'cleanTimePicker.template.html'
})
export class cleanTimePicker{
    @Output() timeChange = new EventEmitter();
    public hstep: number = 1;
    public mstep: number = 15;
    public ismeridian: boolean = true;

    public mytime: Date = new Date();
    public mytimeOld: Date = new Date();

    //public options: any = {
    //    hstep: [1, 2, 3],
    //    mstep: [1, 5, 10, 15, 25, 30]
    //};

    public toggleMode(): void {
        this.ismeridian = !this.ismeridian;
    };

    public update(): void {
        let d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        this.mytime = d;
    };

    public changed(): void {
        this.timeChange.next([this.mytime.getMinutes(), this.mytime.getHours() ]);
    };

    public clear(): void {
        this.mytime = void 0;
    };
}