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
   ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.ipRanges = routeData.ipRanges.ipRanges.entries;
    });
  }
}