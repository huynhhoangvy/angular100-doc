# Day 28: Angular Router - Feature Modules, Child Routes and Services

-   Feature Modules

    -   Split route module into smaller modules
    
    Create a new `NgModule` and move things inside it (components, services, etc.)
    
    ```typescript
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ArticleListComponent } from './article-list/article-list.component';
    import { ArticleDetailComponent } from './article-detail/article-detail.component';
    
    @NgModule({
      imports: [
        CommonModule,
      ],
      declarations: [ArticleListComponent, ArticleDetailComponent]
    })
    export class ArticleModule { }
    ```
    
    Config `RouterModule` the same way as with `AppRoutingModule` but with `forChild`
    
    ```typescript
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { Routes, RouterModule } from '@angular/router';
    import { ArticleListComponent } from './article-list/article-list.component';
    import { ArticleDetailComponent } from './article-detail/article-detail.component';
    
    const routes: Routes = [
      {
        path: 'article',
        component: ArticleListComponent
      },
      {
        path: 'article/:slug',
        component: ArticleDetailComponent
      }
    ];
    
    @NgModule({
      imports: [
        CommonModule,
        RouterModule.forChild(routes),
      ],
      declarations: [ArticleListComponent, ArticleDetailComponent]
    })
    export class ArticleModule { }
    ```
    
    import `ArticleModule` in `AppModule`
    
    ```typescript
    import { ArticleModule } from './article/article.module';
    
    @NgModule({
      imports: [
        BrowserModule,
        FormsModule,
        ArticleModule, // <== lưu ý thứ tự import này
        AppRoutingModule
      ],
      declarations: [ AppComponent ],
      bootstrap:    [ AppComponent ]
    })
    export class AppModule { }
    ```
    
-   Route redirect config

    ```typescript
    const routes: Routes = [
      {
        path: '',
        redirectTo: 'article',
        pathMatch: 'full'
      }
    ];
    ```
    
    -   `full`: like `==` comparision, for full path (app path: `abc/xyz` != browser path: `abc/cde`)
    -   `prefix`: just compare prefix path (app path: `abc` == browser path = `abc/xyz`)

-   Routing Module

    -   Split routing module to a separate module
    
    ```typescript
    const routes: Routes = [
      {
        path: 'article',
        component: ArticleListComponent
      },
      {
        path: 'article/:slug',
        component: ArticleDetailComponent
      }
    ];
    
    @NgModule({
      imports: [
        CommonModule,
        RouterModule.forChild(routes) // <== config routing
      ],
      declarations: [],
      exports: [RouterModule] // <== exports this NgModule
    })
    export class ArticleRoutingModule { }
    ```
    
    Config routing with `RouterModule.forChild(routes)`, then export `RouterModule` for `ArticleModule` to be able to use `directives/components` provided by `RouterModule` without having to import it
    
    ```typescript
    import { ArticleRoutingModule } from './article-routing.module';
    
    @NgModule({
      imports: [
        CommonModule,
        ArticleRoutingModule
      ],
      declarations: [ArticleListComponent, ArticleDetailComponent]
    })
    export class ArticleModule { }
    ```
    
-   Child Routes

    ```typescript
    const routes: Routes = [
      {
        path: 'article',
        component: ArticleListComponent
      },
      {
        path: 'article/:slug',
        component: ArticleDetailComponent
      }
    ];
    ```
    
    Or, use parent-child:
    
    ```typescript
    const routes: Routes = [
      {
        path: 'article',
        children: [
          {
            path: '',
            component: ArticleListComponent,
          },
          {
            path: ':slug',
            component: ArticleDetailComponent
          }
        ]
      },
    ];
    ```
    
    -   Parent route can activate a component, aka layout component. This component must have `router-outlet`
    
    ```typescript
    const routes: Routes = [
      {
        path: 'article',
        component: ArticleComponent, // <== this component can be called `Layout component`
        children: [
          {
            path: '',
            component: ArticleListComponent,
          },
          {
            path: ':slug',
            component: ArticleDetailComponent
          }
        ]
      },
    ];
    ```
    
-   ActivatedRoute Service

    -   Provides access to information about a route associated with a component that is loaded in an outlet. Use to traverse the RouterState tree and extract information from nodes
    -   This service provides some public `APIs` regarding current activated route and loaded component
    -   Retrieve parasms:
        -   Inject this service to `ArticleDetailComponent` to get `params` data
        
        ```typescript
        export class ArticleDetailComponent implements OnInit {
          article$: Observable<Article>;
          constructor(private _route: ActivatedRoute, private _api: ArticleService) {}
        
          ngOnInit(): void {
            let slug = this._route.snapshot.paramMap.get('slug');
            this.article$ = this._api.getArticleBySlug(slug);
          }
        }
        ```

        Or

        ```typescript
        export class ArticleDetailComponent implements OnInit {
          article$: Observable<Article>;
          constructor(private _route: ActivatedRoute, private _api: ArticleService) {}
        
          ngOnInit(): void {
            this.article$ = this._route.paramMap.pipe(
              map(params => params.get('slug')),
              switchMap(slug => this._api.getArticleBySlug(slug))
            );
          }
        }
        ```

        -   Why using `Observable` over `snapshot`:
        -   When the user navigates to one path, `Angular Router` will try to reuse the previous component or create a new one when there is different configs or not exist
        -   Naviagte to `/article/post-1` from `/article`, 2 different configs -> `Angular` will create new a component -> `snapshot` and `paramMap` `Observable` will have the same `slug` value which is `post-1`
        -   Navigate to `/article/post-1` from `/article/post-2`, the same configs + `ArticleDetailsComponent` is currently activated, `Angular Router` will reuse the component -> `snapshot` does not change (due to it is only created once when generating `ArticleDetailsComponent`) while `paramMap Observable` will get a new `slug` value
        -   The solution depends on situation

    -   Retrieve config: query params, route data, etc.
    
        -   `ActivatedRoute Service` also allows getting/observing `query params` with `queryParamMap`
        
        -   URL: `tiepphan.com/page/2?sort=createdDate`, get `sort` using `snapshot.queryParamMap.get('sort')`
        
        -   Or:
        
        ```typescript
        queryParamMap.subscribe(query => {
          console.log(query.get('sort'));
        })
        ```

-   Router Service

    -   A service that provides navigation and URL manipulation capabilities
    
    Navigate to home page
    
    ```typescript
    navigateByUrl(url: string | UrlTree, extras: NavigationExtras = { skipLocationChange: false }): Promise<boolean>;
    navigate(commands: any[], extras: NavigationExtras = { skipLocationChange: false }): Promise<boolean>;
    ```
    
    ```typescript
    class SomeComponent {
      constructor(private router: Router) {}
      onClick() {
        // do something
        this.router.navigate(['/article']);
      }
    }
    ```
    
    Observe `Router Event` for some tasks
    
    ```typescript
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      console.log(e);
    });
    ```
