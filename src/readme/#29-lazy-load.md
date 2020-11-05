# Day 28: Angular Router - Lazy Loading Modules

-   Add Admin Module

    -   AdminComponent: layout
    -   AdminArticleListComponent: component displaying articles in table
    
    -   `AdminRoutingModule`
    
    ```typescript
    const routes: Routes = [
        {
            path: 'admin',
            component: AdminComponent
            children: [
                {
                    path: '',
                    component: AdminArticleListComponent
                }   
            ]
        }   
    ];
    
    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
    export class AdminRoutingMOdule {}
    ```
    
    -   `AdminModule`
    
    ```typescript
    @NgModule({
        declarations: [AdminComponent, AdminArticleListComponent],
        importsL [
            CommonModule,
            ReactiveFormsModule,
            AdminRoutingModule,
        ]
    })
    export class AdminModule {}
    ```
    
    -   import `AdminRoutingMOdule` in `AdminModule`; `AdminModule` in `AppModule`
    
    ```typescript
    @NgModule({
        imports: [BroserModule, AdminModule, ArticleModule, AppRoutingModule],
        declarations: [AppComponent],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
    ```

-   Lazy load module

    -   Delete `AdminModule` in `AppModule` `import`
    -   Reconfig `AdminModule` `route`; remove `'admin'` path in `AdminRouthingModule`
    -   Configure `AppRoutingModule` to load `admin module` (with `lazy load`)
    
    ```typescript
    const routes: Routes = [
        {
            path: 'admin',
            loadChildren: () => import('./admin/admin.module')
            .then(m => m.AdminModule)
        },
        {
            path: '',
            redirectTo: 'article',
            pathMath: 'full'
        }
    ];
    ```
    
    -   Notice that the lazy-loading syntax uses loadChilren followed by a function that uses the browser's built-in `import(...)` syntax for dynamic imports. The import path is the relative path to the modules.

-   Lazy load syntax

    -   `import(...)` (Angular 8) === `loadChildren: './admin/admin.module#AdminModule'`
    
    -   Preloading Lazy Module
    
        -   Separating lazy load module may help user when reloading the page
        -   The problem might appear when the lazy loading module has a big size
        
        -   `Preloading` is used when we know that there are some pages that the users will navigate to first
        -   To enable `preloading` for all lazy load modules, import `PreloadAllModules` from `@angular/router` and configure in `AppRoutingModule`
 
        ```typescript
        import { PreloadAllModules,RouterModule } from '@angular/router';
        
        const routes: Routes = [
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
            },
            {
                path: '',
                redirectTo: 'article',
                pathMatch: 'full'
            }
        ];
        
        @NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
            ],
            exports: [RouterModule]
        })
        export class AppRoutingModule {}
        ```
