import { Component, ChangeDetectorRef, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

export interface IPSummary {
  ipaddress: string,
  threat_potential_score_pct: number,
  threat_classification: string,
  blacklist_class: string
}

const IP_DATA: IPSummary[] = [
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" },
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" },
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" },
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" },
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" },
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" },
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" },
  { ipaddress: "204.16.0.243", threat_potential_score_pct: 82, threat_classification: "High", blacklist_class: "bruteforce" }
];

@Component({
  selector: 'app-ip-query',
  templateUrl: './ip-query.component.html',
  styleUrls: ['./ip-query.component.css']
})
export class IpQueryComponent implements OnInit {
  displayedColumns: string[] = ['ipaddress', 'threat_potential_score_pct', 'threat_classification', 'blacklist_class'];
  dataSource = IP_DATA;

  ngOnInit() {
  }

  formatSubtitle = (percent: number) : string => {
    return "55";
  }


  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  }

  constructor(private observableMedia: ObservableMedia) {}

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

}
