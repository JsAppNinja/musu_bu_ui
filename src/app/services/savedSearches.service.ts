import { Injectable } from '@angular/core';
import { SavedSearchApi, SavedSearch, LoopBackFilter } from '../../../sdk'

@Injectable({
    providedIn: 'root'
  })
export class SavedSearchesService {
  constructor(
    private savedSearchApi: SavedSearchApi
  ){}

  createSearch(userEmail, ips, queryName, description){
      let data = new SavedSearch();
      data.queryName = queryName;
      data.userEmail = userEmail;
      data.ips = ips;
      data.description = description ? description : '';

      return this.savedSearchApi.create<SavedSearch>(data)
      .toPromise();
  }

  getUserSearchById(savedSearchId){
    return this.savedSearchApi.findById<SavedSearch>(savedSearchId)
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

  deleteSearch(id){
    return this.savedSearchApi.deleteById<SavedSearch>(id)
    .toPromise();
  }
}