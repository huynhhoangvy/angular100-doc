import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { filter, pluck, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-article-details',
    templateUrl: './article-details.component.html',
    styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {

    article$: Observable<Article>;

    constructor(private readonly activatedRoute: ActivatedRoute, private readonly articleService: ArticleService) {
    }

    ngOnInit(): void {
        this.article$ = this.activatedRoute.params.pipe(
            pluck('slug'),
            switchMap(slug => this.articleService.getArticle(slug)),
            filter(article => !! article)
        );
        this.activatedRoute.params.subscribe(console.log);
        this.activatedRoute.paramMap.subscribe(console.log);

        console.log(this.activatedRoute.snapshot.params);
        console.log(this.activatedRoute.snapshot.paramMap);
    }

}
