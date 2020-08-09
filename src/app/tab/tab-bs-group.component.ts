import {Component, forwardRef} from '@angular/core';
import {TabGroupComponent} from './tab-group.component';

const tabBsGroupProviders = [
    {
        provide: TabGroupComponent,
        useExisting: forwardRef(() => TabBsGroupComponent),
    },
];

@Component({
    selector: 'app-tab-bs-group',
    template: `
        <ul class="nav nav-tabs">
            <li
                class="nav-item"
                *ngFor="let tab of tabPanelList; let idx = index"
            >
                <a
                    class="nav-link"
                    [class.active]="idx === activeIndex"
                    (click)="activeIndexChange.emit(idx)"
                >{{ tab.title }}
                    <button class="btn btn-danger" (click)="removeTab(tab)">
                        x
                    </button>
                </a>
            </li>
        </ul>

        <div class="tab-body" *ngIf="tabPanelList.length; else noTabs">
            <ng-container
                *ngTemplateOutlet="tabPanelList[activeIndex].panelBody"
            ></ng-container>
        </div>

        <ng-template #noTabs>
            No more tabs.
        </ng-template>
    `,
    providers: [
        {
            provide: TabGroupComponent,
            useExisting: TabBsGroupComponent,
            // useClass: SomeClass,
            // useValue: new SomeClass(),
            // useFactory: (configService) => {return configService},
            // deps: [ConfigurationService],
            // multi:
        },
    ],
})
export class TabBsGroupComponent extends TabGroupComponent {
}
