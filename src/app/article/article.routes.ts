import { Routes } from '@angular/router';
import { ArticleListComponent } from 'src/app/article/article-list/article-list.component';
import { ArticleDetailsComponent } from 'src/app/article/article-details/article-details.component';
import { ArticlesGuard } from 'src/app/guards/articles.guard';

export const articleRoutes: Routes = [
    {
        // path: 'articles',
        // children: [
        //     {
        path: '',
        component: ArticleListComponent,
    },
    {
        path: ':slug',
        canActivateChild: [ArticlesGuard],
        children: [
            {
                path: '', component: ArticleDetailsComponent
            },
            {
                path: 'edit',
                // component: ArticleDetailsEditComponent
            }
        ],
        // component: ArticleDetailsComponent,
        //     },
        // ],
    },
];
