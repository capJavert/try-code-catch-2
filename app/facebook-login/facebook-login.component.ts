import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ng2-facebook-sdk';
import {Component, OnInit} from '@angular/core';
import '../rxjs-operators';
import {user} from "../plan-session";
import {UserService} from "../services/login.service";
import {WebUser} from "../models/user";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'facebook-login',
  templateUrl: 'facebook-login.component.html',
  styleUrls: ['facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit{

  constructor(private fb: FacebookService,
              private userService: UserService,
              private router: Router) {
    fb = new FacebookService();

    let initParams: InitParams = {
      appId: '1888143711408938',
      xfbml: true,
      version: 'v2.8'
    };

    console.debug(fb.init(initParams));

    console.debug("INT");

    this.fb.getLoginStatus()
      .then((response: LoginResponse) => {
        if(!user.id) {
          // login with options
          const options: LoginOptions = {
            scope: 'public_profile,email',
            return_scopes: true,
            enable_profile_selector: true
          };

          this.fb.login(options)
            .then(data => {
              console.debug("FB", data);

              this.fb.api('/me?fields=name,email')
                .then(res => {
                  console.log(res);
                  user.email = res.email;
                  user.ime = res.name;

                  this.userService.create(user.ime, user.email)
                    .subscribe(data => {
                      console.debug("success", data[0]);
                      let u = data[0] as WebUser;
                      user.id = u.id;

                      if(user.redirect == "") {
                        this.router.navigate(["/home"]);
                      } else {
                        this.router.navigate(["/"+user.redirect]);
                      }
                    });
                })
                .catch(e => console.log(e));
            })
            .catch(error => {
              console.debug("FB ERROR", error);
            });
        } else {
          console.log('Logged in', response);
        }
      })
      .catch(e => console.error('Error logging in'));

  }

  ngOnInit(): void {

  }
}
