import {Injectable} from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    get currentUser() {
        return of({username: 'admin', articles: ['title-1']});
    }
}
