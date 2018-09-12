import { Injectable, NgZone } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Okta } from '../services/okta.service';

@Injectable()
export class LoginResolver implements Resolve<any> {

  constructor(
    private okta: Okta, private router: Router, private zone: NgZone
  ) {  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
        this.okta.isSessionActive()
        .then(
            isActive => {
                if(isActive){
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