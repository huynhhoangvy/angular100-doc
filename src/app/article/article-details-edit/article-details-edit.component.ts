import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { filter, pluck, shareReplay, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { CheckDeactivate } from 'src/app/check-deactivate';

@Component({
    selector: 'app-article-details-edit',
    templateUrl: './article-details-edit.component.html',
    styleUrls: ['./article-details-edit.component.scss'],
})
export class ArticleDetailsEditComponent implements OnInit, CheckDeactivate {
    form$: Observable<FormGroup>;
    private initialFormValue: unknown;

    constructor(
        private readonly fb: FormBuilder,
        private readonly activatedRoute: ActivatedRoute,
        private readonly articleService: ArticleService,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(
            pluck('slug'),
            switchMap(slug => this.articleService.getArticle(slug)),
            filter(article => !!article),
            switchMap(article => of(this.initForm(article))),
            shareReplay(1),
            // takeUntil(this.$destroy)
        );
    }

    checkDeactivate(): Observable<boolean> {
        console.log('check deactivate');
        let formValue = {};
        this.form$.pipe(take(1)).subscribe(form => {
            formValue = form.getRawValue();
        });
        console.log({ ...formValue });
        const isEdited = JSON.stringify(this.initialFormValue) !== JSON.stringify(formValue);
        return of(!isEdited || confirm('Do you want to cancel changes?'));
    }

    // canDeactivate(
    //     component: ArticleDetailsEditComponent,
    //     currentRoute: ActivatedRouteSnapshot,
    //     currentState: RouterStateSnapshot,
    //     nextState?: RouterStateSnapshot
    // ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //     throw new Error('Method not implemented.');
    // }

    // checkDeactivate() {
    //     return true;
    // }

    private initForm(article: Article): FormGroup {
        const form = this.fb.group({
            title: [article.title],
            body: [article.body],
        });
        this.initialFormValue = form.getRawValue();
        return form;
    }

}
