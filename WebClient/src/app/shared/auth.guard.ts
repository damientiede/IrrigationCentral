import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService) {}

  canActivate() {
    // Check to see if a user has a valid JWT
    if (this.authService.isLoggedIn) {
      return true;
    }
    return false;

    //if (tokenNotExpired()) {
      // If they do, return true and allow the user to load the home component
      //return true;
    //}

    // If not, they redirect them to the login page
    //this.router.navigate(['/login']);
    //return true;
  }
}
