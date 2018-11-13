/* tslint:disable */

declare var Object: any;
export interface SubscriptionPlanInterface {
  "name": string;
  "ipQueryLimit": number;
  "id"?: any;
}

export class SubscriptionPlan implements SubscriptionPlanInterface {
  "name": string;
  "ipQueryLimit": number;
  "id": any;
  constructor(data?: SubscriptionPlanInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SubscriptionPlan`.
   */
  public static getModelName() {
    return "SubscriptionPlan";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SubscriptionPlan for dynamic purposes.
  **/
  public static factory(data: SubscriptionPlanInterface): SubscriptionPlan{
    return new SubscriptionPlan(data);
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
      name: 'SubscriptionPlan',
      plural: 'subscriptionPlans',
      path: 'subscriptionPlans',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          default: 'free'
        },
        "ipQueryLimit": {
          name: 'ipQueryLimit',
          type: 'number',
          default: 50
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
