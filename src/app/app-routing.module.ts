import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from 'src/app/article-details/article-details.component';
import { ArticleListComponent } from 'src/app/article-list/article-list.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ChildHomeComponent } from 'src/app/home/child-home/child-home.component';

const routes: Routes = [
    // {
    //     path: 'home/child',
    //     component: ChildHomeComponent,
    // },
    {
        path: 'home',
        component: HomeComponent,
        children: [{ path: 'child', component: ChildHomeComponent }],
    },
    {
        path: 'details/:slug',
        component: ArticleDetailsComponent,
    },
    {
        path: '',
        component: ArticleListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
