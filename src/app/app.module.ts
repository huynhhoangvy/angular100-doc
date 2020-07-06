import { TabPanelComponent } from './tab/tab-panel.component';
import { HelloComponent } from './hello/hello.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { ToggleComponent } from './toggle/toggle.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabGroupComponent } from './tab/tab-group.component';
import { TabBsGroupComponent } from './tab/tab-bs-group.component';

@NgModule({
    declarations: [
        AppComponent,
        HelloComponent,
        ProgressBarComponent,
        AuthorListComponent,
        AuthorDetailsComponent,
        ToggleComponent,
        TabGroupComponent,
        TabPanelComponent,
        TabsComponent,
        TabBsGroupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
