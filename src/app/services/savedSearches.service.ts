import { Injectable } from '@angular/core';
import { SavedSearchApi, SavedSearch, LoopBackFilter } from '../../../sdk'

@Injectable({
    providedIn: 'root'
  })
export class SavedSearchesService {
  constructor(
    private savedSearchApi: SavedSearchApi
  ) {}

  createSearch(userEmail, ips, queryName, description) {
      const data = new SavedSearch();
      data.queryName = queryName;
      data.userEmail = userEmail;

      data.ips = [];
      ips.forEach(element => {
        data.ips.push(element.label);
      });

      data.description = description ? description : '';

      return this.savedSearchApi.create<SavedSearch>(data)
      .toPromise();
  }

  getUserSearchById(savedSearchId) {
    return this.savedSearchApi.findById<SavedSearch>(savedSearchId)
    .toPromise();
  }

  getUserSearchByName(name, userEmail){
    let filter: LoopBackFilter = {
      "where": {
        "name": name,
        "userEmail": userEmail
      }
    }
    return this.savedSearchApi.find<SavedSearch>(filter);
  }

  getUserSearches(userEmail) {
    const filter: LoopBackFilter = {
        'where': {
          'userEmail': userEmail
        }
      };
      return this.savedSearchApi.find<SavedSearch>(filter)
      .toPromise();
  }

  updateSearch(data){
    return this.savedSearchApi.updateAttributes<SavedSearch>(data.id, data)
    .toPromise();
  }

  deleteSearch(id) {
    return this.savedSearchApi.deleteById<SavedSearch>(id)
    .toPromise();
  }
}
