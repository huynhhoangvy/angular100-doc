import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { ArticlesGuard } from 'src/app/guards/articles.guard';

const routes: Routes = [
    // {
    //     path: 'home/child',
    //     component: ChildHomeComponent,
    // },
    {
        path: '',
        component: HomeComponent,
        // children: [{ path: 'child', component: ChildHomeComponent }],
    },
    {
        path: 'articles',
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
        data: {
            feature: 'articles',
            permissions: 'article-read',
        },
        // canActivate: [ArticlesGuard],
        canLoad: [ArticlesGuard],
    },
    // {
    //     path: 'details/:slug',
    //     component: ArticleDetailsComponent,
    // },
    // {
    //     path: '',
    //     component: ArticleListComponent,
    // },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            // { enableTracing: true }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
