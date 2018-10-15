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
    return new Promise ((resolve, reject) => {
        var isAuthenticated = this.authService.isAuthenticated();
        if(isAuthenticated){
            return resolve(isAuthenticated);
        }
        else{
            this.router.navigate(['login']);
            return resolve(isAuthenticated);
        }
    });
  }
}