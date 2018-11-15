import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { IpsService } from '../services/ips.service';
import { UserService } from '../services/user.service';
 @Injectable()
export class IpRangesResolver implements Resolve<any> {
   constructor(
    private ipsService: IpsService,
    private userService: UserService
  ) { }
   resolve(route: ActivatedRouteSnapshot) {
    var currentRoute = route.url[0].path;
    if(currentRoute === 'network-name'){
        let queryParam = route.paramMap.get('networkName');
        let parser =  new DOMParser();
        let encodedNetworkName = parser.parseFromString(queryParam, "text/html").documentElement.textContent;
        return new Promise((resolve, reject) => {
            let ipDetail = this.ipsService.getIpRangesByNetworkName(encodedNetworkName)
            .then(
                data => {
                    if(this.userService.user.subscriptionPlan === 'large'){
                        return resolve(data);
                    }
                    else{
                        return resolve(null);
                    }
                },
                err => {
                    console.log(err)
                    return resolve(null)
                }
            )
        });
    }
    if(currentRoute === 'network-type'){
        let queryParam = route.paramMap.get('networkType');
        let parser =  new DOMParser();
        let encodedNetworkName = parser.parseFromString(queryParam, "text/html").documentElement.textContent;
        return new Promise((resolve, reject) => {
            let ipDetail = this.ipsService.getIpRangesByNetworkType(encodedNetworkName)
            .then(
                data => {
                    if(this.userService.user.subscriptionPlan === 'large'){
                        return resolve(data);
                    }
                    else{
                        return resolve(null);
                    }
                },
                err => {
                    console.log(err)
                    return resolve(null)
                }
            )
        });
    }
  }
}