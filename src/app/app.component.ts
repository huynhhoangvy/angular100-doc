import { ToggleComponent } from './toggle/toggle.component';
import { Component, ViewChild, ElementRef, ViewChildren, QueryList, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angular100-doc';
    currentProgress = 'a';
    isChecked = true;

    @ViewChildren(ToggleComponent) toggleComps: QueryList<ToggleComponent>;
    @ViewChild('nameInput', { static: true, read: ElementRef }) nameInput: ElementRef<HTMLInputElement>;

    ngOnInit() {
        this.toggleComps.changes.subscribe(console.log);
    }

    ngAfterViewInit() {
    }
}
