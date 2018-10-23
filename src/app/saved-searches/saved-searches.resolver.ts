import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { IpsService } from '../services/ips.service';
import { SavedSearchesService } from '../services/savedSearches.service';

@Injectable()
export class SavedSearchesResolver implements Resolve<any> {

  constructor(
    private savedSearchesService: SavedSearchesService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    let user = JSON.parse(localStorage.getItem("profile"));
    return new Promise((resolve, reject) => {
      let ipDetail = this.savedSearchesService.getUserSearches(user.email)
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