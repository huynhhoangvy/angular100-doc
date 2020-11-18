import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from 'src/app/article/article-details/article-details.component';
import { articleRoutes } from 'src/app/article/article.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleDetailsEditComponent } from './article-details-edit/article-details-edit.component';

@NgModule({
    declarations: [ArticleListComponent, ArticleDetailsComponent, ArticleDetailsEditComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(articleRoutes),
        ReactiveFormsModule,
    ],
})
export class ArticleModule {
}
