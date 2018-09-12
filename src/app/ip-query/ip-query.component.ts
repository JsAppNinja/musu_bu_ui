import { Component, ChangeDetectorRef, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material';
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
  displayedColumns: string[] = ['ipaddress', 'threat_potential_score_pct', 'threat_classification', 'blacklist_class'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('grid') grid: MatGridList;
  highRiskCount: number = 0;
  mediumRiskCount: number = 0;
  lowRiskCount: number = 0; 

  constructor(public ipsService: IpsService, private observableMedia: ObservableMedia) { }
  
  ngOnInit() {
    
  }
  submitQuery = (ips: string) : void => {
    let ipsList = ips.replace(/ /gi, "").split(",");
    if(ips.length !== 0 && ipsList.length !== 0){
      this.ipsService.getIpsDetail(ipsList).then(
        results => {
          this.ipsService.dataSource.data = results.ipsDetail;
          this.ipsService.dataSource.sort = this.sort;
          results.ipsDetail.forEach(element => {
            if(element.threat_classification === "High"){
              this.highRiskCount++;
            }
            if(element.threat_classification === "Medium"){
              this.mediumRiskCount++;
            }
            if(element.threat_classification === "Low"){
              this.lowRiskCount++;
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
