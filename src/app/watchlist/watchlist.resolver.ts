import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { IpsService } from '../services/ips.service';
import { WatchlistService } from '../services/watchlist.service';

@Injectable()
export class WatchlistResolver implements Resolve<any> {

  constructor(
    private watchlistService: WatchlistService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    let user = JSON.parse(localStorage.getItem("profile"));
    return new Promise((resolve, reject) => {
      let ipDetail = this.watchlistService.getUserSearches(user.email)
      .then(
        data => {
          return resolve(data);
        },
        err => {
          console.log(err)
          return resolve(null)
        }
      )
    });
  }
}
