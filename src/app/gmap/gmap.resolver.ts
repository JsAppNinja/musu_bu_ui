import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../services/user.service';

@Injectable()
export class GmapResolver implements Resolve<any> {

    constructor(
    private userService: UserService,
    private router: Router
    ) { }
    user;
    resolve(route: ActivatedRouteSnapshot) {
        this.user = JSON.parse(localStorage.getItem("profile"));
        return new Promise((resolve, reject) => {
            this.userService.getUserByEmail(this.user.email)
            .then(result => {
                let user = result[0];
                if (user.subscriptionPlan === 'large') {
                  return resolve(true);
                } else {
                  this.router.navigate(['login']);
                  return resolve(false);
                }
            }, err =>{
                return reject(err);
            });
        });
    }
}
