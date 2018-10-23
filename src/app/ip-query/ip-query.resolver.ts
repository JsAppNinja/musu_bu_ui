import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { IpsService } from '../services/ips.service';

@Injectable()
export class IpQueryResolver implements Resolve<any> {

  constructor(
    private ipsService: IpsService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('savedSearchId');
    return new Promise((resolve, reject) => {
        if(id && id.length !==0){
            resolve(id);
        }
        else{
            resolve(null);
        }
    });
  }
}