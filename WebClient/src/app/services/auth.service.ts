import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable } from 'rxjs/Rx';
import { mergeMap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

(window as any).global = window;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token id_token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });
  // Store authentication data
  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;
  refreshSub: any;

  constructor(private router: Router) {
    // this.getAccessToken();
  }

  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleLoginCallback(callback) {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // window.location.hash = '';
        this.getUserInfo(authResult, () => {
          if (typeof callback === 'function') {
            callback();
          }
        });
      } else if (err) {
        console.log(err); // `Error: ${err}`);
      }
    });
  }

  getAccessToken(callbackSuccess, callbackFailed) {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult, () => {
          if (typeof(callbackSuccess) === 'function') {
            callbackSuccess();
          }
        });
      } else {
        if (typeof(callbackFailed) === 'function') {
          callbackFailed();
        }
      }
    });
  }

  getUserInfo(authResult, callback) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        if (typeof callback === 'function') {
            callback();
        }
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
    this.scheduleRenewal();
  }
  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    // localStorage.setItem('isLoggedIn', 'true');
    this.authenticated = true;
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this.accessToken = authResult.accessToken;
    // this._idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    this.scheduleRenewal();
  }
  logout() {
    // Log out of Auth0 session
    // Ensure that returnTo URL is specified in Auth0
    // Application settings for Allowed Logout URLs
    this.authenticated = false;
    this.unscheduleRenewal();
    this.auth0.logout({
      returnTo: environment.auth.returnTo, // 'http://localhost:4200',
      clientID: environment.auth.clientID
    });
  }

  public renewTokens() {
    console.log('renewing tokens');
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.localLogin(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.authenticated) { return; }
    this.unscheduleRenewal();

    const expiresAt = this.expiresAt;

    const expiresIn$ = Observable.of(expiresAt).pipe(
      mergeMap(
        expiresAt => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          const timespan = expiresAt as number - now;
          return Observable.timer(Math.max(1, timespan));
        }
      )
    );
    this.refreshSub = expiresIn$.subscribe(
      () => {
        this.renewTokens();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt && this.authenticated;
  }

}
