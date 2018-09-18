import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatGridList } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

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

@Component({
  selector: 'app-ip-detail',
  templateUrl: './ip-detail.component.html',
  styleUrls: ['./ip-detail.component.css']
})
export class IpDetailComponent implements OnInit {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private observableMedia: ObservableMedia
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

  ipThreatDetail;
  ipThreatDetailFields = [
    "threat_potential_score_pct",
    "threat_classification",
    "blacklist_class",
    "blacklist_class_cnt",
    "blacklist_network_neighbors",
    "blacklist_observations"
  ];

  ipGeoDetail;
  ipGeoDetailFields = [
    "country",
    "stateprov",
    "district",
    "city",
    "zipcode",
    "latitude",
    "longitude",
    "timezone_offset",
    "timezone_name"
  ];

  ipISPDetail;
  ipISPDetailFields = [
    "ispname",
    "network_type",
    "network_group",
    "network_name"
  ];

  circleTitle;
  circleSubtitle;
  circleRiskLevel;
  circleBackgroundColor;
  circleOuterStrokeColor;
  circleRadius;

  setCircleData() {
    this.circleRadius = 100;
    switch(this.ipDetail.threat_classification){
      case "High":
        this.circleTitle = ['High', 'Risk', ''];
        this.circleSubtitle = this.ipDetail.ipaddress;
        this.circleRiskLevel = this.ipDetail.threat_classification;
        this.circleBackgroundColor = '#FDC6CB';
        this.circleOuterStrokeColor = '#dc3545';
        break;
      case "Medium":
        this.circleTitle = ['Medium', 'Risk', ''];
        this.circleSubtitle = this.ipDetail.ipaddress;
        this.circleRiskLevel = this.ipDetail.threat_classification;
        this.circleBackgroundColor = '#FFE9A9';
        this.circleOuterStrokeColor = '#ffc107';
        break;
      case "Low":
        this.circleTitle = ['Low', 'Risk', ''];
        this.circleSubtitle = this.ipDetail.ipaddress;
        this.circleRiskLevel = this.ipDetail.threat_classification;
        this.circleBackgroundColor = '#B8ECC3';
        this.circleOuterStrokeColor = '#28a745';
        break;
      default:
        this.circleTitle = [];
        this.circleSubtitle = this.ipDetail.ipaddress;
        this.circleRiskLevel = this.ipDetail.threat_classification;
        this.circleBackgroundColor = '#e0e0e0';
        this.circleOuterStrokeColor = '#686868';
    }
  }

  ngOnInit() {
    this.ipThreatDetail = {};
    this.ipGeoDetail = {};
    this.ipISPDetail = {};
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.ipDetail = data;
        //Set circle data
        this.setCircleData();
        this.ipThreatDetailFields.forEach( key =>{
          this.ipThreatDetail[key] = data[key];
        });
        this.ipGeoDetailFields.forEach( key =>{
          this.ipGeoDetail[key] = data[key];
        });
        this.ipISPDetailFields.forEach( key =>{
          this.ipISPDetail[key] = data[key];
        });
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
