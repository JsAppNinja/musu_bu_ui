import { Injectable } from '@angular/core';
import { TagApi, Tag, LoopBackFilter } from '../../../sdk'

@Injectable({
    providedIn: 'root'
  })
export class TagsService {
  constructor(
    private tagApi: TagApi
  ){}

  createTag(name, userEmail, ips){
      let data = new Tag();
      data.name = name;
      data.userEmail = userEmail;
      if(ips && ips.length !== 0){
        data.ips = ips;
      }

      return this.tagApi.create<Tag>(data)
      .toPromise();
  }

  getUserTagById(tagId){
    return this.tagApi.findById<Tag>(tagId)
    .toPromise();
  }

  getUserTagByName(name, userEmail){
    let filter: LoopBackFilter = {
      "where": {
        "name": name,
        "userEmail": userEmail
      }
    }
    return this.tagApi.find<Tag>(filter);
  }

  findUserTagByName(userEmail, tagName, existingTags){
    let filter: LoopBackFilter = {
      "where": {
        "and": [
          { "name": { "regexp": "^" + tagName } },
          { "name": { "nin": existingTags} }, //Filter tags already
          { "userEmail": userEmail }
        ]
      }
    }
    return this.tagApi.find<Tag>(filter);
  }

  getUserTagsByIp(ip, userEmail, tagName?){
    let filter: LoopBackFilter = {
      "where": {
        "ips": ip,
        "userEmail": userEmail
      }
    }
    if(tagName){
      filter.where["name"] = { "regexp": "^" + tagName };
    }
    return this.tagApi.find<Tag>(filter);
  }

  getUserTags(userEmail){
    let filter: LoopBackFilter = {
        "where": {
          "userEmail": userEmail
        }
      }
      return this.tagApi.find<Tag>(filter)
      .toPromise()
  }

  updateTag(data){
    return this.tagApi.updateAttributes<Tag>(data.id, data)
    .toPromise();
  }

  deleteTag(id){
    return this.tagApi.deleteById<Tag>(id)
    .toPromise();
  }
}