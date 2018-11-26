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
  ipsListColumns: string[] = ['ipaddress', 'threatScore', 'threatClassification', 'blacklistClass'];

  ipRanges = [];
  ipsList = [];
  totalIpRanges;
  ipsListByBlacklistNeighbors;

  page = 1;
  pageSize = 50;
  length: number;

  title = '';
  currentRoute;
  queryParam;
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
          this.ipsList = routeData.ipRanges.ipsData;
          this.length = routeData.ipRanges.result_count;
          break;
        case 'blacklist-neighbors':
          this.title = 'Blacklist Network Neighbors';
          this.ipsListByBlacklistNeighbors = routeData.ipRanges.ipsData;
          this.ipsList = routeData.ipRanges.ipsData.slice(0, this.pageSize);
          this.length = routeData.ipRanges.result_count;
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
        case 'isp-name':
          this.ipsService.getIpRangesByIspName(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              const ips = data.ipRanges.entries.map(item => item.ipaddress);
              this.ipsService.getIpsDetail(ips).then(response => {
                this.isLoading = false;
                this.ipsList = response.ipsDetail;
              });
            }, err => resolve(null));
          break;
        case 'blacklist-neighbors':
          this.ipsList = this.ipsListByBlacklistNeighbors.slice(
            e.pageIndex * (this.pageSize - 1),
            e.pageIndex * (this.pageSize - 1) + this.pageSize,
          );
          this.isLoading = false;
          break;
        default:
          break;
      }
    })
  }
}
