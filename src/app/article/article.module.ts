import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from 'src/app/article/article-details/article-details.component';
import { articleRoutes } from 'src/app/article/article.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ArticleListComponent, ArticleDetailsComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(articleRoutes),
    ],
})
export class ArticleModule {
}
