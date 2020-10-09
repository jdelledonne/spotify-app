import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { SpotifyService } from '../services/spotify.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private spotifyService: SpotifyService) {}

    /* Function that returns true if the user is logged in */
    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean> {
        return this.spotifyService.current_user != null;
    }
}