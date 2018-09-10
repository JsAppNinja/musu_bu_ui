import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Injectable({
  providedIn: 'root'
})
export class Okta {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
        logo: '../../assets/img/musubu-logo-small-min.png',
        baseUrl: 'https://dev-695454.oktapreview.com/',
        clientId: '0oag6xz82wHIUaPQL0h7',
        redirectUri: 'http://localhost:4200',
        authParams: {
            issuer: 'default'
        },
        features: {
            registration: true,                 // Enable self-service registration flow
            rememberMe: true,                   // Setting to false will remove the checkbox to save username
            //multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
            //selfServiceUnlock: true,          // Will enable unlock in addition to forgotten password
            //smsRecovery: true,                // Enable SMS-based account recovery
            //callRecovery: true,               // Enable voice call-based account recovery
            // router: true,                       // Leave this set to true for the API demo
        },
    });
  }

  getWidget() {
    return this.widget;
  }
}