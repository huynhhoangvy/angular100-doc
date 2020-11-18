import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild, CanDeactivate,
    CanLoad,
    Route,
    RouterStateSnapshot, UrlSegment, UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { ArticleDetailsEditComponent } from 'src/app/article/article-details-edit/article-details-edit.component';
import { CheckDeactivate } from 'src/app/check-deactivate';

@Injectable({
    providedIn: 'root',
})
export class ArticlesGuard implements CanActivate, CanActivateChild, CanLoad, CanDeactivate<CheckDeactivate> {
    constructor(private readonly  authService: AuthService) {
    }

    canDeactivate(
        component: CheckDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> {
        return component.checkDeactivate(currentRoute, currentState, nextState);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('childRoute: ', childRoute);
        const targetSlug = childRoute.params.slug;
        if ( !targetSlug ) {
            return of(false);
        }
        return this.authService.currentUser.pipe(map(user => user.articles.includes(targetSlug)));
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        // return this.permissionService.hasPermission(next.data.permissions);
        // return this.authService.currentUser.pipe(map(Boolean));
        return this.authService.currentUser.pipe(map(user => !!user));
        // return of(false);
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> {
        // return of(false);
        return this.authService.currentUser.pipe(map(user => !!user));
    }
}
