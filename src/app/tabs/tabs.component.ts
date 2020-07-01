import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
    @Input() navs: string[];
    @Input() linkTemplate: TemplateRef<any>;
    constructor() { }

    ngOnInit(): void {
    }

}
