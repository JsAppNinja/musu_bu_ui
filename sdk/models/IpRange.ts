/* tslint:disable */

declare var Object: any;
export interface IpRangeInterface {
  "ip_start_int": string;
  "ip_end_int": string;
  "network_name"?: string;
  "network_type"?: string;
  "network_group"?: string;
  "id"?: any;
}

export class IpRange implements IpRangeInterface {
  "ip_start_int": string;
  "ip_end_int": string;
  "network_name": string;
  "network_type": string;
  "network_group": string;
  "id": any;
  constructor(data?: IpRangeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IpRange`.
   */
  public static getModelName() {
    return "IpRange";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IpRange for dynamic purposes.
  **/
  public static factory(data: IpRangeInterface): IpRange{
    return new IpRange(data);
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
      name: 'IpRange',
      plural: 'ipRanges',
      path: 'ipRanges',
      idName: 'id',
      properties: {
        "ip_start_int": {
          name: 'ip_start_int',
          type: 'string'
        },
        "ip_end_int": {
          name: 'ip_end_int',
          type: 'string'
        },
        "network_name": {
          name: 'network_name',
          type: 'string'
        },
        "network_type": {
          name: 'network_type',
          type: 'string'
        },
        "network_group": {
          name: 'network_group',
          type: 'string'
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
