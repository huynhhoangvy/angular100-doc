"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HelloComponent = void 0;
var core_1 = require("@angular/core");
var HelloComponent = /** @class */ (function () {
    function HelloComponent() {
        this.user = {
            name: 'Foo',
            age: 10
        };
        this.authors = [
            {
                id: 1,
                firstName: "Flora",
                lastName: "Twell",
                email: "ftwell0@phoca.cz",
                gender: "Female",
                ipAddress: "99.180.237.33"
            },
            {
                id: 2,
                firstName: "Priscella",
                lastName: "Signe",
                email: "psigne1@berkeley.edu",
                gender: "Female",
                ipAddress: "183.243.228.65"
            },
        ];
    }
    HelloComponent.prototype.handleClick = function () {
        alert('okay');
    };
    HelloComponent.prototype.ngOnInit = function () {
    };
    HelloComponent = __decorate([
        core_1.Component({
            selector: 'app-hello',
            templateUrl: './hello.component.html',
            styleUrls: ['./hello.component.scss']
        })
    ], HelloComponent);
    return HelloComponent;
}());
exports.HelloComponent = HelloComponent;
