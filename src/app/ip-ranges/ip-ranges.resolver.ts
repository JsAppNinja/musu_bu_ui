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
            let ipDetail = this.ipsService.getIpRangesByNetworkName(encodedNetworkName, 1)
            .then(
                data => {
                    if(this.userService.user.subscriptionPlan === 'large'){
                        return resolve({
                          ...data,
                          currentRoute: 'network-name',
                          queryParam: queryParam
                        });
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
        let encodedNetworkType = parser.parseFromString(queryParam, "text/html").documentElement.textContent;
        return new Promise((resolve, reject) => {
            let ipDetail = this.ipsService.getIpRangesByNetworkType(encodedNetworkType, 1)
            .then(
                data => {
                    if(this.userService.user.subscriptionPlan === 'large'){
                        return resolve({
                          ...data,
                          currentRoute: 'network-type',
                          queryParam: queryParam
                        });
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

    if(currentRoute === 'isp-name'){
        let queryParam = route.paramMap.get('ispName');
        let parser =  new DOMParser();
        let encodedIspName = parser.parseFromString(queryParam, "text/html").documentElement.textContent;
        return new Promise((resolve, reject) => {
            let ipDetail = this.ipsService.getIpRangesByIspName(encodedIspName, 1)
            .then(
                data => {
                    if(this.userService.user.subscriptionPlan !== 'free'){
                      const ips = data.ipRanges.entries.map(item => item.ipaddress);
                      let ipsData = this.ipsService.getIpsDetail(ips)
                        .then(response => {
                          return resolve({
                            ipsData: response.ipsDetail,
                            result_count: data.ipRanges.result_count,
                            currentRoute: 'isp-name',
                            queryParam
                          })
                      });
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

    if(currentRoute === 'network-group'){
        let queryParam = route.paramMap.get('networkGroup');
        let parser =  new DOMParser();
        let encodedNetworkGroup = parser.parseFromString(queryParam, "text/html").documentElement.textContent;
        return new Promise((resolve, reject) => {
            let ipDetail = this.ipsService.getIpRangesByNetworkGroup(encodedNetworkGroup, 1)
            .then(
                data => {
                    if(this.userService.user.subscriptionPlan === 'large'){
                        return resolve({
                          ...data,
                          currentRoute: 'network-group',
                          queryParam: queryParam
                        });
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

    if(currentRoute === 'blacklist-neighbors'){
        let queryParam = route.paramMap.get('blacklistNeighbors');
        let parser =  new DOMParser();
        let encodedBlacklistNeighbors = parser.parseFromString(queryParam, "text/html").documentElement.textContent;
        return new Promise((resolve, reject) => {
            let ipDetail = this.ipsService.getIpRangesByBlacklistNeighbors(encodedBlacklistNeighbors)
            .then(
                data => {
                    if(this.userService.user.subscriptionPlan !== 'free'){
                      let ipsData = this.ipsService.getIpsDetail(data.ipRanges.blacklist_network_neighbors)
                        .then(response => {
                          return resolve({
                            ipsData: response.ipsDetail,
                            result_count: data.ipRanges.blacklist_network_neighbor_cnt,
                            currentRoute: 'blacklist-neighbors',
                            queryParam
                          })
                        });
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
