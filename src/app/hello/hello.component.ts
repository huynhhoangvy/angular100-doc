import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
    user = {
        name: 'Foo',
        age: 10
    };

    handleClick() {
        alert('okay');
    }

    constructor() { }

    ngOnInit(): void {
    }

}
