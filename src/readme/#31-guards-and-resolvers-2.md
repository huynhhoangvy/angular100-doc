# Day #31: Angular Router - Guards and Resolvers

-   `Route Guards`

    `If all guards return true, navigation will continue. If any guard return false, navigation will be cancelled.`

-   `CanDeactivate`

    ```typescript
    const routes: Routes = [
        {
            path: 'article',
            component: ArticleComponent,
            children: [
                {
                    path: '',
                    component: ArticleListComponent
                },
                {
                    path: ':slug',
                    component: ArticleDetailsComponent
                },
                {
                    path: ':slug/edit',
                    component: ArticleEditComponent,
                    canActivate: [CanEditArticleGuard]
                }
            ]
        }
    ];
    ```

    ```typescript
    const routes: Routes = [
        {
            path: 'article',
            component: ArticleComponent,
            children: [
                {
                    path: ':slug/edit',
                    component: ArticleEditComponent,
                    canActivate: [CanEditArticleGuard],
                    canDeactivate: [CanLeaveEditGuard]
                }
            ]
        }
    ];
    ```

    -   When the user navigate out of the current route, `Angular Router` will run `CanLeaveEditGuard.canDeactivate`

    ```typescript
    @Injectable({
      providedIn: 'root'
    })
    export class CanLeaveEditGuard implements CanDeactivate<ArticleEditComponent> {
      canDeactivate(component: ArticleEditComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return !component.isEditing;
      }
    }
    ```

    ```typescript
    import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, UrlTree } from '@angular/router';
    import { Observable } from 'rxjs';
    
    export interface CheckDeactivate {
      checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    }
    ```

    ```typescript
    @Injectable({
      providedIn: 'root'
    })
    export class CanLeaveEditGuard implements CanDeactivate<CheckDeactivate> {
      canDeactivate(component: CheckDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.checkDeactivate(currentRoute, currentState, nextState);
      }
    }
    ```

    ```typescript
    export class ArticleEditComponent implements OnInit, CheckDeactivate {
      slug$ = this.activatedRoute.paramMap.pipe(
        map(params => params.get('slug'))
      );
    
      isEditing = false;
      
      constructor(private activatedRoute: ActivatedRoute) { }
    
      ngOnInit() {
      }
    
      checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return !this.isEditing;
      }
    
    }
    ```

    Confirm dialog implementation

    ```typescript
    export class ArticleEditComponent implements OnInit, CheckDeactivate {
      slug$ = this.activatedRoute.paramMap.pipe(
        map(params => params.get('slug'))
      );
    
      isEditing = false;
      
      constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }
    
      ngOnInit() {
      }
    
      openDialog() {
        const ref = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Do you want to leave this page?'
          }
        });
        return ref.afterClosed();
      }
    
      checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return !this.isEditing || this.openDialog();
      }
    
    }
    ```

-   `CanLoad`

    ```typescript
    import { Injectable } from '@angular/core';
    import { CanLoad, UrlSegment, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
    import { Observable } from 'rxjs';
    
    @Injectable({
      providedIn: 'root'
    })
    export class CanLoadAdminGuard implements CanLoad {
      canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
      }
    }
    ```

    ```typescript
    const routes: Routes = [
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canLoad: [CanLoadAdminGuard], // <== this is an array, we can have multiple guards
      },
      {
        path: '',
        redirectTo: 'article',
        pathMatch: 'full'
      }
    ];
    ```

    ```typescript
    @Injectable({
      providedIn: 'root'
    })
    export class CanLoadAdminGuard implements CanLoad {
      constructor(private userService: UserService) {}
      canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userService.currentUser.isAdmin;
      }
    }
    ```
