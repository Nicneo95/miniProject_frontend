import { Component, Inject, OnInit } from '@angular/core';
import AppConfig from '../../configurations/app-config';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
// create file .d.ts to fix error
import OktaSignIn from '@okta/okta-signin-widget';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      features: {
        registration: true,
      },
      baseUrl: AppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: AppConfig.oidc.clientId,
      redirectUri: AppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: AppConfig.oidc.issuer,
        scopes: AppConfig.oidc.scopes,
      },
      idps: [{ type: 'GOOGLE', id: 'google' }],
      idpDisplay: "SECONDARY",
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget',
      }, // this name should be same as div tag id in login.component.html
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}
