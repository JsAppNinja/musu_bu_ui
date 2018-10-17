import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ChangeDetectorRef, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatGridList, MatChipInputEvent } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { IpsService } from '../services/ips.service';
import { SavedSearches } from '../services/savedSearches.service';
import { MatSort } from '@angular/material';
export interface IPSummary {
  ipaddress: string,
  threat_potential_score_pct: number,
  threat_classification: string,
  blacklist_class: string
}
@Component({
  selector: 'app-ip-query',
  templateUrl: './ip-query.component.html',
  styleUrls: ['./ip-query.component.css']
})
export class IpQueryComponent implements OnInit {
  //Chip input properties
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  displayedColumns: string[] = ['ipaddress', 'threat_potential_score_pct', 'threat_classification', 'blacklist_class'];
  historyGridColumns: string[] = ['ips']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('grid') grid: MatGridList;
  ipsList;
  ipsLimit;
  user;
  savedSearches=[];

  constructor(
    public ipsService: IpsService, 
    private observableMedia: ObservableMedia, 
    private savedSearchesService: SavedSearches,
    private route: ActivatedRoute
    ) { }
  
  ngOnInit() {
    //Init user
    // this.route.data.subscribe(routeData => {
    //   this.user = routeData['user'];
    // })
    this.user = JSON.parse(localStorage.getItem("profile"));

    this.savedSearchesService.getUserSearches(this.user.email).then(
      (result) => {
        this.savedSearches = result;
      },
      (err) =>{

      }
    )

    this.ipsList = [];
    this.ipsLimit = 50;

    this.ipsService.highRiskCircle.title = ['High', 'Risk', ''];
    this.ipsService.highRiskCircle.riskLevel = "High";
    this.ipsService.highRiskCircle.backgroundColor = '#FDC6CB';
    this.ipsService.highRiskCircle.outerStrokeColor = '#dc3545';
    this.ipsService.highRiskCircle.radius = '70';

    this.ipsService.mediumRiskCircle.title = ['Medium', 'Risk', ''];
    this.ipsService.mediumRiskCircle.subtitle = this.ipsService.mediumRiskCount.toString();
    this.ipsService.mediumRiskCircle.riskLevel = "Medium";
    this.ipsService.mediumRiskCircle.backgroundColor = '#FFE9A9';
    this.ipsService.mediumRiskCircle.outerStrokeColor = '#ffc107';
    this.ipsService.mediumRiskCircle.radius = '70';

    this.ipsService.lowRiskCircle.title = ['Low', 'Risk', ''];
    this.ipsService.lowRiskCircle.subtitle = this.ipsService.lowRiskCount.toString();
    this.ipsService.lowRiskCircle.riskLevel = "Low";
    this.ipsService.lowRiskCircle.backgroundColor = '#B8ECC3';
    this.ipsService.lowRiskCircle.outerStrokeColor = '#28a745';
    this.ipsService.lowRiskCircle.radius = '70';
  }

  //Save search
  save(){
    this.savedSearchesService.createSearch(this.user.email, this.ipsList);
  }

  //Clears chips
  clear(){
    this.ipsList = [];
  }

  //Adds chips to the textbox
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our ip
    if ((value || '').trim()) {
      if(this.ipsList.length < this.ipsLimit){
        var trimmedValue = value.trim()
        if(!this.ipsList.includes(trimmedValue)){
          this.ipsList.push(value.trim());
        }
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  //Removes chips to the textbox
  remove(ip): void {
    const index = this.ipsList.indexOf(ip);
    if (index >= 0) {
      this.ipsList.splice(index, 1);
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
        if(this.ipsList.length < this.ipsLimit){
          var trimmedValue = value.trim()
          if(!this.ipsList.includes(trimmedValue)){
            this.ipsList.push(value.trim());
          }
        }
      }
    })
  }

  submitQuery = (ipsList) : void => {
    this.ipsService.highRiskCircle.count=0;
    this.ipsService.mediumRiskCircle.count=0;
    this.ipsService.lowRiskCircle.count=0;
    if(ipsList){
      this.ipsList = ipsList;
    }
    else{
      ipsList = this.ipsList;
    }
    if(ipsList.length !== 0){
      this.ipsService.getIpsDetail(ipsList).then(
        results => {
          this.ipsService.dataSource.data = results.ipsDetail;
          this.ipsService.dataSource.sort = this.sort;
          results.ipsDetail.forEach(element => {
            if(element.threat_classification === "High"){
              this.ipsService.highRiskCircle.count++;
            }
            if(element.threat_classification === "Medium"){
              this.ipsService.mediumRiskCircle.count++;
            }
            if(element.threat_classification === "Low"){
              this.ipsService.lowRiskCircle.count++;
            }
          });
        }
      );
    }
  }
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 3,
    xs: 1
  }
  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }
}
