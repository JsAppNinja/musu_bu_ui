import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 @Component({
  selector: 'app-ip-ranges',
  templateUrl: './ip-ranges.component.html',
  styleUrls: ['./ip-ranges.component.css']
})
export class IpRangesComponent implements OnInit {
  constructor(private route: ActivatedRoute,) { }
  ipRangesColumns: string[] = ['ipStartInt', 'ipEndInt', 'networkName', 'networkType', 'networkGroup'];
  ipRanges = [];
  totalIpRanges;
  page = 1;
  ipsList = [];
  ipRangesByBlacklistNeighbors;
  title = '';
  currentRoute;
  queryParam;
  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.currentRoute = routeData.ipRanges.currentRoute;
      this.queryParam = routeData.ipRanges.queryParam;
      switch (routeData.ipRanges.currentRoute) {
        case 'network-type':
          this.title = 'Network Type';
          this.ipRanges = routeData.ipRanges.ipRanges.entries;
          break;
        case 'network-name':
          this.title = 'Network Name';
          this.ipRanges = routeData.ipRanges.ipRanges.entries;
          break;
        case 'network-group':
          this.title = 'Network Group';
          this.ipRanges = routeData.ipRanges.ipRanges.entries;
          break;
        case 'isp-name':
          this.title = 'ISP Name';
          this.ipsList = routeData.ipRanges.ipRanges.entries.map(item => item.ipaddress);
          break;
        case 'blacklist-neighbors':
          this.title = 'Blacklist Network Neighbors';
          this.ipsList = routeData.ipRanges.ipRanges.blacklist_network_neighbors;
          break;
        default:
          break;
      }
    });
  }
}
