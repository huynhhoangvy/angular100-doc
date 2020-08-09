import { ToggleComponent } from './toggle/toggle.component';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'angular100-doc';
    currentProgress = 'a';
    isChecked = true;
    showLast = true;
    questions = {
        question1: true,
        question2: false,
    };
    counter = 1;
    navs = [ 'Active', 'Link 1', 'Link 2' ];
    currentIndex = 0;
    showTab4 = true;
    currentDate = new Date();

    interval$ = interval(1000);
    time = 0;

    addr = {
        add1: '123 str',
        add2: 'strx',
        city: 'acme',
        state: 'state',
        zip: '1123',
        country: 'US',
    };
    user = [
        {
            name: 'user1',
            age: 30,
        },
        {
            name: 'user null',
            age: 28,
        },
        {
            name: 'sinh hoc',
            age: 15,
        },
        {
            name: 'hoc sinh',
            age: 11,
        },
    ];

    @ViewChildren(ToggleComponent) toggleComps: QueryList<ToggleComponent>;
    @ViewChild('nameInput', { static: true, read: ElementRef }) nameInput: ElementRef<HTMLInputElement>;

    addUser() {
        // this.user.push({name: 'new user', age: 31});
        this.user = [ ...this.user, { name: 'immutable', age: 19 } ];
    }

    ngOnInit() {
        //   this.interval$.subscribe(val => {
        //     this.time = val;
        //   });
    }

    ngAfterViewInit() {
        this.toggleComps.changes.subscribe(console.log);
    }
}
