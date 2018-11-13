import { Injectable, NgZone } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginResolver implements Resolve<any> {
  user;
  constructor(
    private authService: AuthService, 
    private userService: UserService, 
    private router: Router, 
    private zone: NgZone
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    var router = this.router;
    this.user = JSON.parse(localStorage.getItem("profile"));
    return new Promise ((resolve, reject) => {
        var isAuthenticated = this.authService.isAuthenticated();
        if(isAuthenticated){
            this.userService.getUserByEmail(this.user.email)
            .then(result => {
              //If there is no record of the user in our DB, create it.
              if(result && result.length !== 0){
                if(this.userService.user){
                  return resolve(isAuthenticated);
                }
                else{
                  this.userService.user = result[0]
                  this.userService.getSubscriptionPlanObject(this.userService.user.subscriptionPlan)
                  .then(result => {
                    this.userService.user.subscriptionPlanObject = result[0];
                    return resolve(isAuthenticated);
                  }, err => {
                    
                  });
                }
                  
              }
              else{
                this.userService.createUser({ email: this.user.email })
                .then(result => {
                  return resolve(isAuthenticated);
                }, 
                err =>{

                });
                
              }
            })
            
        }
        else{
            this.router.navigate(['login']);
            return resolve(isAuthenticated);
        }
    });
  }
}