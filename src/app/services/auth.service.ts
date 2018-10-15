import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Lock } from 'auth0-lock';
import { environment } from '../../environments/environment';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  domain = environment.auth0_domain;
  clientId = environment.auth0_client_id;
  uiUrl = environment.ui_url;

  auth0 = new auth0.WebAuth({
    clientID: this.clientId,
    domain: this.domain,
    responseType: 'token id_token',
    redirectUri: this.uiUrl,
    scope: 'openid'
  });

  constructor(public router: Router) {}

  

  // Initializing our Auth0Lock
  lock = new Auth0Lock(
    this.clientId,
    this.domain,
    {
        container: 'hiw-login-container',
        auth: {
            redirectUrl: this.uiUrl + '/login',
            responseType: 'token'
        },
        additionalSignUpFields: [
            {
                name: "first_name",
                placeholder: "Enter your first name",
                validator: function(first_name) {
                    return {
                        valid: first_name.length > 0,
                        hint: "First name cannot be empty!" // optional
                    };
                }
            },
            {
                name: "last_name",
                placeholder: "Enter your last name",
                validator: function(last_name) {
                    return {
                        valid: last_name.length > 0,
                        hint: "Last name cannot be empty!" // optional
                    };
                }
            }
        ],
        theme: {
            logo: '../../assets/img/MusubuApp final logo-PNG.png',
            primaryColor: '#028b08'
        },
        // socialButtonStyle: 'small',
        languageDictionary: {
            title: "Log In"
        },
        allowShowPassword: true,
        allowForgotPassword: true,
    }
  );
  
  public getAuth0Manager = (token) : auth0.Management =>{   
    return new auth0.Management({
        domain: this.domain,
        token: token
    });
  }

  public setSession(authResult, profile): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile',JSON.stringify(profile));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route

  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}