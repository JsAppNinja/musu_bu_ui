import { Injectable } from '@angular/core';
import { SavedSearchApi, SavedSearch, LoopBackFilter } from '../../../sdk'

@Injectable({
    providedIn: 'root'
  })
export class SavedSearches {
  constructor(
    private savedSearchApi: SavedSearchApi
  ){}

  createSearch(userEmail, ips){
      let data = new SavedSearch();
      data.userEmail = userEmail;
      data.ips = ips;

      return this.savedSearchApi.create<SavedSearch>(data)
      .toPromise();
  }

  getUserSearches(userEmail){
    let filter: LoopBackFilter = {
        "where": {
          "userEmail": userEmail
        }
      }
      return this.savedSearchApi.find<SavedSearch>(filter)
      .toPromise()
  }
}