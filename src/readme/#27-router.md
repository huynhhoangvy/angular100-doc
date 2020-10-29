# Day #27: Angular Router

-   Routes order does matters in Angular app: complex first, simple last

```typescript
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
```

```typescript
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule // Đây chính là AppRoutingModule được tạo tự động bằng CLI
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
```

```typescript
    const routes: Routes = [];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
    })
    export class AppRoutingModule {}
```

```typescript
    const routes: Routes = [
      {
        path: "detail",
        component: ArticleDetailComponent,
      },
      {
        path: "",
        component: ArticleListComponent,
      },
    ];
```

```typescript
    <ul class="nav nav-pills card-header-pills">
      <li class="nav-item">
        <a class="nav-link" routerLink="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="detail">Detail</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
```

```typescript
    const Articles: Article[] = [
      {
        id: "1",
        slug: "bai-viet-1",
        title: "Bai viet 1",
        content: "Day la noi dung bai viet 1",
        updateAt: "2020-07-06T13:26:31.785Z",
      },
      {
        id: "2",
        slug: "bai-viet-2",
        title: "Bai viet 2",
        content: "Day la noi dung bai viet 2 nhe",
        updateAt: "2020-07-15:00:00.000Z",
      },
    ];
    @Injectable({
      providedIn: "root",
    })
    export class ArticleService {
      getArticles(): Observable<Article[]> {
        return of(Articles).pipe(delay(500));
      }
    }
```

```typescript
    export class ArticleListComponent implements OnInit {
      articles$: Observable<Article[]>;
      constructor(private _api: ArticleService) {}
    
      ngOnInit(): void {
        this.articles$ = this._api.getArticles();
      }
    }
```

```typescript
    <div class="row" *ngIf="articles$ | async as articles">
      <div class="col-md-3" *ngFor="let article of articles">
        <div class="card text-center">
          <div class="card-header">
            {{ article.title }}
          </div>
          <div class="card-body">
            <p class="card-text">{{ article.content }}</p>
            <a [routerLink]="article.slug" class="btn btn-primary">
              Xem {{ article.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
```

```typescript
    const routes: Routes = [
      {
        path: ":slug",
        component: ArticleDetailComponent,
      },
      {
        path: "",
        component: ArticleListComponent,
      },
    ];
```

```typescript
    export class ArticleDetailComponent implements OnInit {
      article$: Observable<Article>;
      constructor(private _route: ActivatedRoute, private _api: ArticleService) {}
    
      ngOnInit(): void {
        let slug = this._route.snapshot.paramMap.get("slug");
        this.article$ = this._api.getArticleBySlug(slug);
      }
    }
```
