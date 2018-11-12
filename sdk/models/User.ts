/* tslint:disable */

declare var Object: any;
export interface UserInterface {
  "email": string;
  "firstName"?: string;
  "lastName"?: string;
  "subscriptionPlan": string;
  "isAdmin"?: boolean;
  "id"?: any;
}

export class User implements UserInterface {
  "email": string;
  "firstName": string;
  "lastName": string;
  "subscriptionPlan": string;
  "isAdmin": boolean;
  "id": any;
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
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
      name: 'User',
      plural: 'users',
      path: 'users',
      idName: 'id',
      properties: {
        "email": {
          name: 'email',
          type: 'string'
        },
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "subscriptionPlan": {
          name: 'subscriptionPlan',
          type: 'string',
          default: 'free'
        },
        "isAdmin": {
          name: 'isAdmin',
          type: 'boolean'
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
