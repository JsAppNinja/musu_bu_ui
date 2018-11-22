import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { IpsService } from '../services/ips.service';

@Component({
  selector: 'app-ip-ranges',
  templateUrl: './ip-ranges.component.html',
  styleUrls: ['./ip-ranges.component.css']
})
export class IpRangesComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private ipsService: IpsService,
    private router: Router,
  ) { }
  ipRangesColumns: string[] = ['ipStartInt', 'ipEndInt', 'networkName', 'networkType', 'networkGroup'];
  ipRanges = [];
  totalIpRanges;
  page = 1;
  ipsList = [];
  ipRangesByBlacklistNeighbors;
  title = '';
  currentRoute;
  queryParam;
  length: number;
  isLoading = false;

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.route.data.subscribe(routeData => {
      this.currentRoute = routeData.ipRanges.currentRoute;
      this.queryParam = routeData.ipRanges.queryParam;

      switch (routeData.ipRanges.currentRoute) {
        case 'network-type':
          this.title = 'Network Type';
          this.length = routeData.ipRanges.ipRanges.result_count;
          this.ipRanges = routeData.ipRanges.ipRanges.entries;
          break;
        case 'network-name':
          this.title = 'Network Name';
          this.length = routeData.ipRanges.ipRanges.result_count;
          this.ipRanges = routeData.ipRanges.ipRanges.entries;
          break;
        case 'network-group':
          this.title = 'Network Group';
          this.length = routeData.ipRanges.ipRanges.result_count;
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

  getPageInfo(e) {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      switch(this.currentRoute) {
        case 'network-name':
          this.ipsService.getIpRangesByNetworkName(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              this.ipRanges = data.ipRanges.entries;
              this.isLoading = false;
            }, err => resolve(null));
          break;
        case 'network-type':
          this.ipsService.getIpRangesByNetworkType(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              this.isLoading = false;
              this.ipRanges = data.ipRanges.entries;
            }, err => resolve(null));
          break;
        case 'network-group':
          this.ipsService.getIpRangesByNetworkGroup(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              this.isLoading = false;
              this.ipRanges = data.ipRanges.entries;
            }, err => resolve(null));
          break;
        default:
          break;
      }
    })
  }
}
