import { HelloComponent } from './hello/hello.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';

@NgModule({
    declarations: [
        AppComponent,
        HelloComponent,
        ProgressBarComponent,
        AuthorListComponent,
        AuthorDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
