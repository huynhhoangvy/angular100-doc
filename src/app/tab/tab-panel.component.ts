import { Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TabGroupComponent } from './tab-group.component';
import { TabContentDirective } from './tab-content.directive';

@Component({
    selector: 'app-tab-panel',
    template: `<ng-template>
    <ng-content> </ng-content>
  </ng-template>`,
})

export class TabPanelComponent implements OnInit, OnDestroy {
    @Input() title: string;
    @ViewChild(TemplateRef, { static: true }) implicitBody: TemplateRef<unknown>;
    @ContentChild(TabContentDirective, { static: true, read: TemplateRef }) explicitBody: TemplateRef<unknown>;

    constructor( private tabGroup: TabGroupComponent ) {
    }

    get panelBody(): TemplateRef<unknown> {
        return this.explicitBody || this.implicitBody;
    }

    ngOnInit() {
        this.tabGroup.addTab(this);
    }

    ngOnDestroy() {
        this.tabGroup.removeTab(this);
    }
}
