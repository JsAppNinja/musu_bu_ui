import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../services/user.service';

@Injectable()
export class AdminResolver implements Resolve<any> {

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
                if(user.isAdmin){
                    return resolve(user.isAdmin);
                }
                else{
                    this.router.navigate(['login']);
                    return resolve(user.isAdmin);
                }
            }, err =>{
                return reject(err);
            });
        });
    }
}