import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  formatSubtitle = (percent: number) : string => {
    return "55";
  }

}
