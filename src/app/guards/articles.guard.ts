import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ArticlesGuard implements CanActivate, CanActivateChild {
    constructor(private readonly  authService: AuthService) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('childRoute: ', childRoute);
        const targetSlug = childRoute.params.slug;
        if (!targetSlug) {
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
    }
}
