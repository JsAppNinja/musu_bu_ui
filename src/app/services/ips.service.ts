import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpDetailApi, IpDetail, LoopBackFilter, IpRangeApi } from '../../../sdk';
import { MatTableDataSource } from '@angular/material';
import { IpRiskCircleProperties } from '../ip-risk-circle/ip-risk-circle.component';
// import { AnswerApi, Answer } from '../../../sdk';

@Injectable()
export class IpsService {
  constructor(
    private http: HttpClient,
    private ipDetailApi: IpDetailApi,
    private ipRangeApi: IpRangeApi
  ) {}

  getIpDetail(ip) {
    return this.ipDetailApi.getIpDetailFromMusubuAPI(ip)
    .toPromise();
  }

  getIpsDetail(ips) {
    return this.ipDetailApi.getIpsDetail(ips)
    .toPromise();
  }

  getIpRangesByNetworkName(networkName, pageNum){
    return this.ipRangeApi.getIpDetailRangesByNetworkName(networkName, pageNum)
    .toPromise();
  }

  getIpRangesByNetworkType(networkType, pageNum){
    return this.ipRangeApi.getIpDetailRangesByNetworkType(networkType, pageNum)
    .toPromise();
  }

  getIpRangesByIspName(ispName){
    return this.ipRangeApi.getIpDetailRangesByIspName(ispName)
    .toPromise();
  }

  getIpRangesByNetworkGroup(networkGroup, pageNum){
    return this.ipRangeApi.getIpDetailRangesByNetworkGroup(networkGroup, pageNum)
    .toPromise();
  }

  getIpRangesByBlacklistNeighbors(blacklistNeighbors){
    return this.ipRangeApi.getIpDetailRangesByBlacklistNeighbors(blacklistNeighbors)
    .toPromise();
  }

  clearServiceCache() {
    this.dataSource = new MatTableDataSource([]);
    this.highRiskCount = 0;
    this.mediumRiskCount = 0;
    this.lowRiskCount = 0;

    this.highRiskCircle = {
      count: 0
    };
    this.mediumRiskCircle = {
      count: 0
    };
    this.lowRiskCircle = {
      count: 0
    }
  }

  dataSource = new MatTableDataSource([]);
  highRiskCount: number = 0;
  mediumRiskCount: number = 0;
  lowRiskCount: number = 0;

  highRiskCircle: IpRiskCircleProperties = {
    count: 0
  };
  mediumRiskCircle: IpRiskCircleProperties = {
    count: 0
  };
  lowRiskCircle: IpRiskCircleProperties = {
    count: 0
  }
}
