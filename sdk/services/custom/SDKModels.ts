/* tslint:disable */
import { Injectable } from '@angular/core';
import { IpDetail } from '../../models/IpDetail';
import { User } from '../../models/User';
import { SavedSearch } from '../../models/SavedSearch';
import { Tag } from '../../models/Tag';
import { IpRange } from '../../models/IpRange';
import { SubscriptionPlan } from '../../models/SubscriptionPlan';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    IpDetail: IpDetail,
    User: User,
    SavedSearch: SavedSearch,
    Tag: Tag,
    IpRange: IpRange,
    SubscriptionPlan: SubscriptionPlan,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
