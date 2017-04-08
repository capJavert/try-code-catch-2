import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ng2-facebook-sdk';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {user} from "../plan-session";

@Component({
  moduleId: module.id,
  selector: 'facebook-login',
  templateUrl: 'facebook-login.component.html',
  styleUrls: ['facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit{

  constructor(private fb: FacebookService) {
    this.fb = new FacebookService();

    let initParams: InitParams = {
      appId: '1888143711408938',
      xfbml: true,
      version: 'v2.8'
    };

    console.debug(this.fb.init(initParams));

    console.debug("INIT");
  }

  ngOnInit(): void {
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
}
