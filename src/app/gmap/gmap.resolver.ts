import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from '../services/user.service';

@Injectable()
export class GmapResolver implements Resolve<any> {
    constructor(
    private userService: UserService,
    ) { }
    user;
    resolve(route: ActivatedRouteSnapshot) {
        this.user = JSON.parse(localStorage.getItem("profile"));
        return new Promise((resolve, reject) => {
            this.userService.getUserByEmail(this.user.email)
            .then(result => {
                return resolve(result[0].subscriptionPlan);
            }, err =>{
                return reject(err);
            });
        });
    }
}
