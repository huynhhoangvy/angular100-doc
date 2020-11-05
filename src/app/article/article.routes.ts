import { Routes } from '@angular/router';
import { ArticleListComponent } from 'src/app/article/article-list/article-list.component';
import { ArticleDetailsComponent } from 'src/app/article/article-details/article-details.component';

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
                component: ArticleDetailsComponent,
        //     },
        // ],
    },
];
