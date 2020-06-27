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

    authors = [
        {
            id: 1,
            firstName: "Flora",
            lastName: "Twell",
            email: "ftwell0@phoca.cz",
            gender: "Female",
            ipAddress: "99.180.237.33",
        },
        {
            id: 2,
            firstName: "Priscella",
            lastName: "Signe",
            email: "psigne1@berkeley.edu",
            gender: "Female",
            ipAddress: "183.243.228.65",
        },
        // more data
    ];

    handleClick() {
        alert('okay');
    }

    constructor() { }

    ngOnInit(): void {
    }

}
