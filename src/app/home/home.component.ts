import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    article$: Observable<Article[]>;

    constructor(private readonly articleService: ArticleService, private readonly router: Router) {
    }

    ngOnInit(): void {
        this.article$ = this.articleService.articles$;
    }

    onReadMoreClick(slug: string) {
        this.router.navigate(['/details', slug]);
    }

}
