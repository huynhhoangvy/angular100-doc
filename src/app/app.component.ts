import { ToggleComponent } from './toggle/toggle.component';
import { Component, ViewChild, ElementRef, ViewChildren, QueryList, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'angular100-doc';
    currentProgress = 'a';
    isChecked = true;
    showLast = true;
    questions = {
        question1: true,
        question2: false
    };
    counter = 1;
    navs = ['Active', 'Link 1', 'Link 2'];

    @ViewChildren(ToggleComponent) toggleComps: QueryList<ToggleComponent>;
    @ViewChild('nameInput', { static: true, read: ElementRef }) nameInput: ElementRef<HTMLInputElement>;

    ngOnInit() {
    }
    ngAfterViewInit() {
        this.toggleComps.changes.subscribe(console.log);
        console.log('hello');
    }
}
