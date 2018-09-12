import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { IpsService } from '../services/ips.service';

@Injectable()
export class IpDetailResolver implements Resolve<any> {

  constructor(
    private ipsService: IpsService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    let ip = route.paramMap.get('ipaddress');
    return new Promise((resolve, reject) => {
      let ipDetail = this.ipsService.getIpDetail(ip)
      .then(
        data => {
          return resolve(data.ipDetail);
        },
        err => {
          console.log(err)
          return resolve(null)
        }
      )
    });
  }
}