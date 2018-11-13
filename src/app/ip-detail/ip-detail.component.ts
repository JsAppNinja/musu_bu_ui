import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatGridList, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { TagsService } from '../services/tags.service';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { UserService } from '../services/user.service';

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
    private tagsService: TagsService,
    private userService: UserService
  ) { }

  tagsFormControl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

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

  //Chip input properties for tags section
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tagsFull;
  tags;
  tagsLimit;
  tagsSuggestions;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


  ngOnInit() {
    this.ipThreatDetail = {};
    this.ipGeoDetail = {};
    this.ipISPDetail = {};
    this.tagsLimit = 100;
    this.tags = [];
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
    // this.filteredOptions = this.tagsFormControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );

    this.tagsSuggestions = new Observable<string[]>();
    this.tagsSuggestions = this.tagsFormControl
    .valueChanges
    .pipe(
      debounceTime(300),
      switchMap(tag => {
        return this.tagsService.findUserTagByName(this.userService.user.email, tag, this.tags);
      })
    )

    window.scrollTo(0, 0);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(tag) {
    if (tag) { return tag.name; }
  }

  getIpTags(){
    this.tagsService.getUserTagsByIp(this.ipDetail.ipaddress, this.userService.user.email).toPromise().then(
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

  //Value selected on Autocomplete
  selected(event: MatAutocompleteSelectedEvent): void {
    this.validateAndAddTag(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagsFormControl.setValue(null);
  }

  //Adds chips to the textbox
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    this.validateAndAddTag(value);
    // Reset the input value
    this.tagInput.nativeElement.value = '';
    this.tagsFormControl.setValue(null);
  }

  validateAndAddTag(value){
    if ((value || '').trim()) {
      if(this.tags.length < this.tagsLimit){
        var trimmedValue = value.trim()
        if(!this.tags.includes(trimmedValue)){
          this.tagsService.getUserTagByName(trimmedValue, this.userService.user.email).toPromise().then(
            result =>{
              if(result.length === 0){
                //create
                this.tagsService.createTag(trimmedValue, this.userService.user.email, [this.ipDetail.ipaddress]).then(
                  result =>{
                    this.getIpTags();
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
                      this.getIpTags();
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

  onClickBuyApp(){
    window.open("https://musubu.io/app-pricing/", "_blank");
  }

  isArray(value){
    return Array.isArray(value);
  }

  convertToSet(array){
    return new Set(array);
  }

  getKeys(map){
    return Object.keys(map);
  }

  backButton(){
    this._location.back();
  }

}
