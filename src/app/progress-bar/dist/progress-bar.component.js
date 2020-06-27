"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProgressBarComponent = void 0;
var core_1 = require("@angular/core");
var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
        this._progress = 40;
        this.backgroundColor = '#ccc';
        this.progressColor = 'tomato';
    }
    Object.defineProperty(ProgressBarComponent.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (val) {
            // validation value
            if (typeof val !== 'number') {
                var progress = Number(val);
                if (Number.isNaN(progress)) {
                    this._progress = 0;
                }
                else {
                    this._progress = progress;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    ProgressBarComponent.prototype.ngOnChanges = function (changes) {
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
    };
    ProgressBarComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], ProgressBarComponent.prototype, "progress");
    __decorate([
        core_1.Input()
    ], ProgressBarComponent.prototype, "backgroundColor");
    __decorate([
        core_1.Input()
    ], ProgressBarComponent.prototype, "progressColor");
    ProgressBarComponent = __decorate([
        core_1.Component({
            selector: 'app-progress-bar',
            templateUrl: './progress-bar.component.html',
            styleUrls: ['./progress-bar.component.scss']
        })
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());
exports.ProgressBarComponent = ProgressBarComponent;
