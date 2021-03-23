import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PermissionsService {
    constructor(private authService: AuthService) { }

    isAuthorized$(): Observable<string> {
        const helper = new JwtHelperService();
        return this.authService.getAccessTokenSilently().pipe(
            switchMap(accessToken => {
                const permissions = helper.decodeToken(accessToken).permissions;
                if (permissions.includes('all:user')) {
                    return of('user');
                } else if (permissions.includes('all:admin')){
                    return of('admin');
                }
            })
        );
    }
}
