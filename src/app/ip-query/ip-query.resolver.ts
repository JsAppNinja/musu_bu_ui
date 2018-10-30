import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { IpsService } from '../services/ips.service';

@Injectable()
export class IpQueryResolver implements Resolve<any> {

  constructor(
    private ipsService: IpsService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('queryId');
    let type = route.paramMap.get('queryType');
    return new Promise((resolve, reject) => {
        if(id && type && id.length !==0 && type.length !== 0){
            resolve({
              queryId: id,
              queryType: type
            });
        }
        else{
            resolve(null);
        }
    });
  }
}