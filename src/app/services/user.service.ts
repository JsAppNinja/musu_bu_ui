import { Injectable } from '@angular/core';
import { UserApi, User, LoopBackFilter, SubscriptionPlanApi, SubscriptionPlan } from '../../../sdk'

@Injectable({
    providedIn: 'root'
  })
export class UserService {
  constructor(
    private userApi: UserApi,
    private subscriptionPlanApi: SubscriptionPlanApi
  ){}

  getOktaUser(id){
      return this.userApi.getOktaUser(id)
      .toPromise()
  }

  createUser(user){
    return this.userApi.create<User>(user)
    .toPromise();
  }

  getUsers(){
    return this.userApi.find()
    .toPromise();
  }

  deleteUser(user){
    return this.userApi.deleteById<User>(user.id)
    .toPromise();
  }

  getSubscriptionPlans(){
    return this.subscriptionPlanApi.find<SubscriptionPlan>()
    .toPromise();
  }

  updateSubscriptionPlan(user){
    return this.userApi.updateAttributes<User>(user.id, user)
    .toPromise();
  }

  getUserByEmail(userEmail){
    let filter: LoopBackFilter = {
      "where": {
        "email": userEmail
      }
    }
    return this.userApi.find<User>(filter)
    .toPromise();
  }

  getSubscriptionPlanObject(subscriptionType){
    let filter: LoopBackFilter = {
      "where": {
        "name": subscriptionType
      }
    }
    return this.subscriptionPlanApi.find<SubscriptionPlan>(filter)
    .toPromise();
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