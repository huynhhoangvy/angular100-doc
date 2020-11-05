import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {

    article$: Observable<Article[]>;

    constructor(private readonly articleService: ArticleService, private readonly router: Router) {
    }

    ngOnInit(): void {
        this.article$ = this.articleService.articles$;
    }

    onReadMoreClick(slug: string) {
        this.router.navigate(['/articles', slug]);
    }

}
