/* tslint:disable */

declare var Object: any;
export interface SavedSearchInterface {
  "queryName": string;
  "description"?: string;
  "createdOn": Date;
  "userEmail": string;
  "ips": Array<any>;
  "id"?: any;
}

export class SavedSearch implements SavedSearchInterface {
  "queryName": string;
  "description": string;
  "createdOn": Date;
  "userEmail": string;
  "ips": Array<any>;
  "id": any;
  constructor(data?: SavedSearchInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SavedSearch`.
   */
  public static getModelName() {
    return "SavedSearch";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SavedSearch for dynamic purposes.
  **/
  public static factory(data: SavedSearchInterface): SavedSearch{
    return new SavedSearch(data);
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
      name: 'SavedSearch',
      plural: 'savedSearches',
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
