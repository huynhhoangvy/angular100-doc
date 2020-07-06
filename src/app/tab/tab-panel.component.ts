import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { TabGroupComponent } from './tab-group.component';

@Component({
  selector: 'app-tab-panel',
  template: `<ng-template>
    <ng-content> </ng-content>
  </ng-template>`,
})
export class TabPanelComponent {
  @Input() title: string;
  @ViewChild(TemplateRef, { static: true }) panelBody: TemplateRef<unknown>;

  constructor(private tabGroup: TabGroupComponent) {
    this.tabGroup.addTab(this);
  }
}
