import { Injectable } from '@angular/core';
import { UserApi, User } from '../../../sdk'

@Injectable({
    providedIn: 'root'
  })
export class UserService {
  constructor(
    private userApi: UserApi
  ){}

  getOktaUser(id){
      return this.userApi.getOktaUser(id)
      .toPromise()
  }

  subscribeWithMailChimps(user){
    let mergeFields = {
        FNAME: user.firstName ? user.firstName : '',
        LNAME: user.lastName ? user.lastName : ''
    };
    return this.userApi.subscribeWithMailChimps(user.email, "subscribed", mergeFields)
    .toPromise();
  }

}