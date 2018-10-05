import { Injectable, NgZone } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Okta } from '../services/okta.service';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginResolver implements Resolve<any> {
  user;
  oktaSignIn;
  constructor(
    private okta: Okta, private userService: UserService, private router: Router, private zone: NgZone
  ) {
    this.oktaSignIn = okta.getWidget();
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
        this.okta.isSessionActive()
        .then(
            isActive => {
                if(isActive){
                    this.oktaSignIn.session.get((response) => {
                        //Get user object from Okta
                        this.userService.getOktaUser(response.userId).then(
                            results =>{
                            this.user = results.user;
                            //Try creating the user with MailChimps.
                            this.userService.subscribeWithMailChimps(this.user.profile).then(
                                response => {
                                //User created on MailChimps
                                },
                                error => {
                                //Error creating user on MailChimps
                                }
                            );
                            }
                        )
                    });
                    return resolve(isActive);
                }
                else{
                    this.zone.run(() => this.router.navigate(['login']));
                    return reject(isActive);
                }
            }
        );
    })
  }
}