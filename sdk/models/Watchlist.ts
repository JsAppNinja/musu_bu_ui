/* tslint:disable */

declare var Object: any;
export interface WatchlistInterface {
  "queryName": string;
  "description"?: string;
  "createdOn": Date;
  "userEmail": string;
  "ips": Array<any>;
  "id"?: any;
}

export class Watchlist implements WatchlistInterface {
  "queryName": string;
  "description": string;
  "createdOn": Date;
  "userEmail": string;
  "ips": Array<any>;
  "id": any;
  constructor(data?: WatchlistInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Watchlist`.
   */
  public static getModelName() {
    return "Watchlist";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Watchlist for dynamic purposes.
  **/
  public static factory(data: WatchlistInterface): Watchlist{
    return new Watchlist(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Watchlist',
      plural: 'watchlist',
      path: 'savedSearches',
      idName: 'id',
      properties: {
        "queryName": {
          name: 'queryName',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "createdOn": {
          name: 'createdOn',
          type: 'Date',
          default: new Date(0)
        },
        "userEmail": {
          name: 'userEmail',
          type: 'string'
        },
        "ips": {
          name: 'ips',
          type: 'Array&lt;any&gt;'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
