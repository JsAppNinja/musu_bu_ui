import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpsService } from '../services/ips.service';
import { SavedSearchesService } from '../services/savedSearches.service';
import { TagsService } from '../services/tags.service';
import { MatSort, MatDialog, MatChipInputEvent } from '@angular/material';
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';

declare var google: any;

export interface QueryNameDialogData {
  queryName: string;
  description: string;
}

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: [
    './gmap.component.css',
    '../ip-query/ip-query.component.css'
  ]
})
export class GmapComponent implements OnInit, AfterViewInit {
  ipsList;
  ipsLimit;
  ipsGeoData;
  removable = true;
  map;
  maxZoomLevel = 16;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('AgmMap') agmMap: AgmMap;
  constructor(
    public ipsService: IpsService,
    private savedSearchesService: SavedSearchesService,
    private tagsService: TagsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.ipsList = [];
    this.ipsGeoData = [];
    this.ipsLimit = 50;

    this.route.data.subscribe(routeData => {
      const queryData = routeData['queryData'];
      if (queryData && queryData.queryId && queryData.queryId.length !== 0) {
        this.ipsList = [];
        this.ipsService.dataSource.data = [];
        switch (queryData.queryType) {
          case 'saved-search':
            this.getAndRunUserSearch(queryData.queryId);
            break;
          case 'tag':
            this.getAndRunTagSearch(queryData.queryId);
            break;
          default:
            break;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.agmMap.mapReady.subscribe(map => {
      this.map = map;
    });
  }

  getAndRunUserSearch(savedSearchId) {
    this.savedSearchesService.getUserSearchById(savedSearchId).then(
      (result) => {
        this.ipsList = result.ips;
        this.submitQuery(this.ipsList);
      },
      (err) => {

      }
    );
  }

  getAndRunTagSearch(tagId) {
    this.tagsService.getUserTagById(tagId).then(
      (result) => {
        this.ipsList = result.ips;
        this.submitQuery(this.ipsList);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // // Save search
  // save() {
  //   this.savedSearchesService.createSearch(this.user.email, this.ipsList, this.queryName, this.description).then(
  //     result => {
  //
  //     },
  //     err => {
  //
  //     }
  //   );
  // }
  //
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(QueryNameDialog, {
  //     width: '275px',
  //     data: {
  //       queryName: this.queryName,
  //       description: this.description
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.queryName = result.queryName;
  //       this.description = result.description;
  //       this.save();
  //     }
  //   });
  // }

  clear() {
    this.ipsList = [];
    this.ipsGeoData = [];
  }

  // Adds chips to the textbox
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our ip
    if ((value || '').trim()) {
      if (this.ipsList.length < this.ipsLimit) {
        const trimmedValue = value.trim();
        if (!this.ipsList.includes(trimmedValue)) {
          this.ipsList.push(value.trim());
        }
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.submitQuery(this.ipsList);
  }

  // Removes chips to the textbox
  remove(ip): void {
    const index = this.ipsList.indexOf(ip);
    if (index >= 0) {
      this.ipsList.splice(index, 1);
    }
    this.submitQuery(this.ipsList);
  }

  // Handles paste event for chips addition
  paste(event: ClipboardEvent): void {
    event.preventDefault();
    event.clipboardData
      .getData('Text')
      .split(/,|\n/)
      .forEach(value => {
        if ((value || '').trim()) {
          if (this.ipsList.length < this.ipsLimit) {
            const trimmedValue = value.trim();
            if (!this.ipsList.includes(trimmedValue)) {
              this.ipsList.push(value.trim());
            }
          }
        }
      });
  }

  submitQuery = (ipsList): void => {
    this.ipsService.highRiskCircle.count = 0;
    this.ipsService.mediumRiskCircle.count = 0;
    this.ipsService.lowRiskCircle.count = 0;
    this.ipsList = ipsList;

    Promise.all(ipsList.map(ip =>
      this.ipsService.getIpDetail(ip).then(data => data.ipDetail)
    )).then(result => {
      console.log(result)
      this.ipsGeoData = result.map((item: any) => ({
        latitude: item.latitude,
        longitude: item.longitude,
        ipaddress: item.ipaddress,
        threatLevel: item.threat_classification,
        blacklistClass: item.blacklist_class,
        iconUrl: {
          url: item.threat_classification === 'Low'
            ? '../../assets/markers/green.png'
            : item.threat_classification === 'Medium'
              ? '../../assets/markers/yellow.png'
              : '../../assets/markers/red.png',
          scaledSize: {
            width: 50,
            height: 50
          }
        }
      }));

      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      let mm: any;
      for (mm of result) {
        bounds.extend(new google.maps.LatLng(mm.latitude, mm.longitude));
      }
      if (this.map) {
        this.map.fitBounds(bounds);
      }
    });
  }
}
