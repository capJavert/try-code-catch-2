import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ng2-facebook-sdk';
import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {user} from "../plan-session";

export class LoginService {
  private fb: FacebookService;

  constructor() {

    let initParams: InitParams = {
      appId: '1888143711408938',
      xfbml: true,
      version: 'v2.8'
    };

    this.fb.init(initParams);

    console.debug("INIT");

    this.fb.login()
      .then((response: LoginResponse) => console.log('Logged in', response))
      .catch(e => console.debug('Error logging in'));

// login with options
    const options: LoginOptions = {
      scope: 'public_profile,email',
      return_scopes: true,
      enable_profile_selector: true
    };

    this.fb.login(options)
      .then(data => {
        console.debug("FB", data);
      })
      .catch(error => {
        console.debug("FB ERROR", error);
      });
  }

  login(): void {

  }

  logout(): void {

  }
}
