import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {
    @Input() backgroundColor = '#ccc';
    @Input() progressColor = 'tomato';

    constructor() {
    }

    private _progress = 40;

    get progress() {
        return this._progress;
    }

    @Input() set progress(val: number) {
        // validation value
        if (typeof val !== 'number') {
            const progress = Number(val);
            if (Number.isNaN(progress)) {
                this._progress = 0;
            } else {
                this._progress = progress;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log({progress: this._progress});
        // if ('progress' in changes) {
        //     if (typeof changes['progress'].currentValue !== 'number') {
        //         const progress = Number(changes['progress'].currentValue);
        //         if (Number.isNaN(progress)) {
        //             this.progress = 0;
        //         } else {
        //             this.progress = progress;
        //         }
        //     }
        // }
    }

    ngOnInit(): void {
    }

}
