import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ChangeDetectorRef, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { MatGridList, MatChipInputEvent } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { IpsService } from '../services/ips.service';
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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('grid') grid: MatGridList;
  ipsList;
  ipsLimit;

  constructor(public ipsService: IpsService, private observableMedia: ObservableMedia) { }
  
  ngOnInit() {
    this.ipsList = [];
    this.ipsLimit = 50;
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

  submitQuery = (ips: string) : void => {
    this.ipsService.highRiskCount=0;
    this.ipsService.mediumRiskCount=0;
    this.ipsService.lowRiskCount=0;
    if(this.ipsList.length !== 0){
      this.ipsService.getIpsDetail(this.ipsList).then(
        results => {
          this.ipsService.dataSource.data = results.ipsDetail;
          this.ipsService.dataSource.sort = this.sort;
          results.ipsDetail.forEach(element => {
            if(element.threat_classification === "High"){
              this.ipsService.highRiskCount++;
            }
            if(element.threat_classification === "Medium"){
              this.ipsService.mediumRiskCount++;
            }
            if(element.threat_classification === "Low"){
              this.ipsService.lowRiskCount++;
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
    sm: 1,
    xs: 1
  }
  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }
}
