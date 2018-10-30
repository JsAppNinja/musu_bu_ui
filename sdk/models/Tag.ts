/* tslint:disable */

declare var Object: any;
export interface TagInterface {
  "name": string;
  "userEmail": string;
  "ips": Array<any>;
  "createdOn": Date;
  "id"?: any;
}

export class Tag implements TagInterface {
  "name": string;
  "userEmail": string;
  "ips": Array<any>;
  "createdOn": Date;
  "id": any;
  constructor(data?: TagInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Tag`.
   */
  public static getModelName() {
    return "Tag";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Tag for dynamic purposes.
  **/
  public static factory(data: TagInterface): Tag{
    return new Tag(data);
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
      name: 'Tag',
      plural: 'tags',
      path: 'tags',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "userEmail": {
          name: 'userEmail',
          type: 'string'
        },
        "ips": {
          name: 'ips',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "createdOn": {
          name: 'createdOn',
          type: 'Date',
          default: new Date(0)
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
