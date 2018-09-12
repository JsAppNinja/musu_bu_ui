/* tslint:disable */

declare var Object: any;
export interface IpDetailInterface {
  "ipaddress": string;
  "ipint"?: number;
  "threat_potential_score_pct"?: number;
  "threat_classification"?: string;
  "blacklist_class"?: string;
  "blacklist_class_cnt"?: number;
  "blacklist_network_neighbors"?: number;
  "blacklist_observations"?: number;
  "country"?: string;
  "stateprov"?: string;
  "district"?: string;
  "city"?: string;
  "zipcode"?: string;
  "latitude"?: number;
  "longitude"?: number;
  "timezone_offset"?: number;
  "timezone_name"?: string;
  "ispname"?: string;
  "network_type"?: string;
  "network_group"?: string;
  "network_name"?: string;
  "id"?: any;
}

export class IpDetail implements IpDetailInterface {
  "ipaddress": string;
  "ipint": number;
  "threat_potential_score_pct": number;
  "threat_classification": string;
  "blacklist_class": string;
  "blacklist_class_cnt": number;
  "blacklist_network_neighbors": number;
  "blacklist_observations": number;
  "country": string;
  "stateprov": string;
  "district": string;
  "city": string;
  "zipcode": string;
  "latitude": number;
  "longitude": number;
  "timezone_offset": number;
  "timezone_name": string;
  "ispname": string;
  "network_type": string;
  "network_group": string;
  "network_name": string;
  "id": any;
  constructor(data?: IpDetailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IpDetail`.
   */
  public static getModelName() {
    return "IpDetail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IpDetail for dynamic purposes.
  **/
  public static factory(data: IpDetailInterface): IpDetail{
    return new IpDetail(data);
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
      name: 'IpDetail',
      plural: 'IpDetails',
      path: 'IpDetails',
      idName: 'id',
      properties: {
        "ipaddress": {
          name: 'ipaddress',
          type: 'string'
        },
        "ipint": {
          name: 'ipint',
          type: 'number'
        },
        "threat_potential_score_pct": {
          name: 'threat_potential_score_pct',
          type: 'number'
        },
        "threat_classification": {
          name: 'threat_classification',
          type: 'string'
        },
        "blacklist_class": {
          name: 'blacklist_class',
          type: 'string'
        },
        "blacklist_class_cnt": {
          name: 'blacklist_class_cnt',
          type: 'number'
        },
        "blacklist_network_neighbors": {
          name: 'blacklist_network_neighbors',
          type: 'number'
        },
        "blacklist_observations": {
          name: 'blacklist_observations',
          type: 'number'
        },
        "country": {
          name: 'country',
          type: 'string'
        },
        "stateprov": {
          name: 'stateprov',
          type: 'string'
        },
        "district": {
          name: 'district',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "zipcode": {
          name: 'zipcode',
          type: 'string'
        },
        "latitude": {
          name: 'latitude',
          type: 'number'
        },
        "longitude": {
          name: 'longitude',
          type: 'number'
        },
        "timezone_offset": {
          name: 'timezone_offset',
          type: 'number'
        },
        "timezone_name": {
          name: 'timezone_name',
          type: 'string'
        },
        "ispname": {
          name: 'ispname',
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
        "network_name": {
          name: 'network_name',
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
