import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IpsService } from '../services/ips.service';

@Component({
  selector: 'app-ip-ranges',
  templateUrl: './ip-ranges.component.html',
  styleUrls: ['./ip-ranges.component.css']
})
export class IpRangesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource([]);
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private ipsService: IpsService,
    private router: Router,
    private _location: Location,
  ) { }
  ipRangesColumns: string[] = ['ip_start_int', 'ip_end_int', 'network_name', 'network_type', 'network_group'];
  ipsListColumns: string[] = ['ipaddress', 'threat_potential_score_pct', 'threat_classification', 'blacklist_class'];

  ipRanges = [];
  ipsList = [];
  totalIpRanges;
  ipsListByBlacklistNeighbors;

  page = 1;
  pageSize = 50;
  itemsLength: number;

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
          this.itemsLength = routeData.ipRanges.ipRanges.result_count;
          this.dataSource.data = routeData.ipRanges.ipRanges.entries;
          break;
        case 'network-name':
          this.title = 'Network Name';
          this.itemsLength = routeData.ipRanges.ipRanges.result_count;
          this.dataSource.data = routeData.ipRanges.ipRanges.entries;
          break;
        case 'network-group':
          this.title = 'Network Group';
          this.itemsLength = routeData.ipRanges.ipRanges.result_count;
          this.dataSource.data = routeData.ipRanges.ipRanges.entries;
          break;
        case 'isp-name':
          this.title = 'ISP Name';
          this.dataSource.data = routeData.ipRanges.ipsData;
          this.itemsLength = routeData.ipRanges.result_count;
          break;
        case 'blacklist-neighbors':
          this.title = 'Blacklist Network Neighbors';
          this.ipsListByBlacklistNeighbors = routeData.ipRanges.ipsData;
          this.dataSource.data = routeData.ipRanges.ipsData.slice(0, this.pageSize);
          this.itemsLength = routeData.ipRanges.result_count;
          break;
        default:
          break;
      }
    });

    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  getPageInfo(e) {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      switch(this.currentRoute) {
        case 'network-name':
          this.ipsService.getIpRangesByNetworkName(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              this.dataSource.data = data.ipRanges.entries;
              this.isLoading = false;
            }, err => resolve(null));
          break;
        case 'network-type':
          this.ipsService.getIpRangesByNetworkType(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              this.dataSource.data = data.ipRanges.entries;
              this.isLoading = false;
            }, err => resolve(null));
          break;
        case 'network-group':
          this.ipsService.getIpRangesByNetworkGroup(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              this.dataSource.data = data.ipRanges.entries;
              this.isLoading = false;
            }, err => resolve(null));
          break;
        case 'isp-name':
          this.ipsService.getIpRangesByIspName(this.queryParam, (e.pageIndex + 1).toString())
            .then(data => {
              const ips = data.ipRanges.entries.map(item => item.ipaddress);
              this.ipsService.getIpsDetail(ips).then(response => {
                this.dataSource.data = response.ipsDetail;
                this.isLoading = false;
              });
            }, err => resolve(null));
          break;
        case 'blacklist-neighbors':
          this.dataSource.data = this.ipsListByBlacklistNeighbors.slice(
            e.pageIndex * (this.pageSize - 1),
            e.pageIndex * (this.pageSize - 1) + this.pageSize,
          );
          this.isLoading = false;
          break;
        default:
          break;
      }
    });
  }

  backButton(){
    this._location.back();
  }
}
