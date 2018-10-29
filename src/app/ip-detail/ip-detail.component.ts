import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatGridList, MatChipInputEvent } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { TagsService } from '../services/tags.service';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';

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
    private observableMedia: ObservableMedia,
    private tagsService: TagsService
  ) { }

  tagsFormControl = new FormControl();

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

  user;
  //Chip input properties for tags section
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tagsFull;
  tags;
  tagsLimit;
  tagsSuggestions;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("profile"));
    this.ipThreatDetail = {};
    this.ipGeoDetail = {};
    this.ipISPDetail = {};
    this.tagsLimit = 100;
    this.tags = [];
    this.tagsSuggestions = [];
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
        this.getIpTags();
      }
    })

    //Automcomplete
    // this.tagsFormControl
    // .valueChanges
    // .pipe(
    //   debounceTime(300),
    //   switchMap(tag => this.tagsService.getUserTagsByIp(this.ipDetail.ipaddress, this.user.email, tag))
    // ).subscribe(result => this.tagsSuggestions = result)

    window.scrollTo(0, 0);
  }

  displayFn(tag) {
    if (tag) { return tag.name; }
  }

  getIpTags(){
    this.tagsService.getUserTagsByIp(this.ipDetail.ipaddress, this.user.email).toPromise().then(
      result => {
        this.tagsFull = result;
        this.tags = result.map(val =>{
          return val.name;
        });
      },
      err => {

      }
    );
  }

  //Adds chips to the textbox
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      if(this.tags.length < this.tagsLimit){
        var trimmedValue = value.trim()
        if(!this.tags.includes(trimmedValue)){
          this.tagsService.getUserTagByName(trimmedValue, this.user.email).toPromise().then(
            result =>{
              if(result.length === 0){
                //create
                this.tagsService.createTag(trimmedValue, this.user.email, [this.ipDetail.ipaddress]).then(
                  result =>{
                    this.tags.push(trimmedValue);
                  },
                  err =>{

                  }
                )
              }
              else{
                let tag = result[0];
                if(tag.ips.indexOf(trimmedValue) < 0){
                  //update
                  tag.ips.push(this.ipDetail.ipaddress);
                  this.tagsService.updateTag(tag).then(
                    result =>{
                      this.tags.push(trimmedValue);
                    },
                    err => {

                    }
                  );
                }
              }
            },
            err => {

            }
          )
        }
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  //Removes chips to the textbox
  remove(tagName): void {
    const index = this.tags.indexOf(tagName);
    if (index >= 0) {
      var tag = this.tagsFull.find(aTag => aTag.name === tagName);
      let ipIndex = tag.ips.indexOf(this.ipDetail.ipaddress);
      tag.ips.splice(ipIndex, 1);
      this.tagsService.updateTag(tag).then(
        result => {
          this.tags.splice(index, 1);
        },
        err => {

        }
      )
    }
  }

  //Handles paste event for chips addition
  paste(event: ClipboardEvent): void {
    event.preventDefault();
    event.clipboardData
    .getData('Text')
    .split(/,|\n/)
    .forEach(value => {
      if ((value || '').trim()) {
        if(this.tags.length < this.tagsLimit){
          var trimmedValue = value.trim()
          if(!this.tags.includes(trimmedValue)){
            this.tags.push(value.trim());
          }
        }
      }
    })
  }

  isArray(value){
    return Array.isArray(value);
  }

  getKeys(map){
    return Object.keys(map);
  }

  backButton(){
    this._location.back();
  }

}
