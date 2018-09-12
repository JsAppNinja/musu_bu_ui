import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

export interface IpDetail {
    ipaddress: string,
    ipint: number,
    threat_potential_score_pct: number,
    threat_classification: string,
    blacklist_class: string,
    blacklist_class_cnt: number,
    blacklist_network_neighbors: number,
    blacklist_observations: number,
    country: string,
    stateprov: string,
    district: string,
    city: string,
    zipcode: string,
    latitude: number,
    longitude: number,
    timezone_offset: number,
    timezone_name: string,
    ispname: string,
    network_type: string,
    network_group: string,
    network_name: string
}

export interface IpThreatDetail {
    threat_potential_score_pct: number,
    threat_classification: string,
    blacklist_class: string,
    blacklist_class_cnt: number,
    blacklist_network_neighbors: number,
    blacklist_observations: number
}

export interface IpGeoDetail {
    country: string,
    stateprov: string,
    district: string,
    city: string,
    zipcode: string,
    latitude: number,
    longitude: number,
    timezone_offset: number,
    timezone_name: string
}
export interface IpISPDetail {
    ispname: string,
    network_type: string,
    network_group: string,
    network_name: string
}

@Component({
  selector: 'app-ip-detail',
  templateUrl: './ip-detail.component.html',
  styleUrls: ['./ip-detail.component.css']
})
export class IpDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ipDetail: IpDetail;
  fieldNames = {
    ipaddress: "IP Address",
    ipint: "IP Integer Representation",
    threat_potential_score_pct: "Threat Score",
    threat_classification: "Threat Classification",
    blacklist_class: "Blacklist Class",
    blacklist_class_cnt: "Blacklist Count",
    blacklist_network_neighbors: "Blacklist Network Neighbors",
    blacklist_observations: "Blacklist Observations",
    country: "Country",
    stateprov: "State/Province",
    district: "District",
    city: "City",
    zipcode: "Zip Code",
    latitude: "Latitude",
    longitude: "Longitude",
    timezone_offset: "Timezone Offset",
    timezone_name: "Timezone",
    ispname: "ISP Name",
    network_type: "Network Type",
    network_group: "Network Group",
    network_name: "Network Name"
  }

  ipThreatDetail: IpThreatDetail;
  fieldNames = {
    threat_potential_score_pct: "Threat Score",
    threat_classification: "Threat Classification",
    blacklist_class: "Blacklist Class",
    blacklist_class_cnt: "Blacklist Count",
    blacklist_network_neighbors: "Blacklist Network Neighbors",
    blacklist_observations: "Blacklist Observations"
  }

  ipGeoDetail: IpGeoDetail;
  fieldNames = {
    country: "Country",
    stateprov: "State/Province",
    district: "District",
    city: "City",
    zipcode: "Zip Code",
    latitude: "Latitude",
    longitude: "Longitude",
    timezone_offset: "Timezone Offset",
    timezone_name: "Timezone"
  }

  ipISPDetail: IpISPDetail;
  fieldNames = {
    ispname: "ISP Name",
    network_type: "Network Type",
    network_group: "Network Group",
    network_name: "Network Name"
  }

  ngOnInit() {
    
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.ipDetail = data;
      }
    })
  }

  getKeys(map){
    return Object.keys(map);
  }

  backButton(){
    this._location.back();
  }


}
