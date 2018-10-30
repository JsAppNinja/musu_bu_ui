import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, ChangeDetectorRef, OnInit, AfterContentInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatGridList, MatChipInputEvent } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { IpsService } from '../services/ips.service';
import { SavedSearchesService } from '../services/savedSearches.service';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagsService } from '../services/tags.service';

import saveAs from 'file-saver';
import * as moment from 'moment';

export interface IPSummary {
  ipaddress: string;
  threat_potential_score_pct: number;
  threat_classification: string;
  blacklist_class: string;
}

export interface QueryNameDialogData {
  queryName: string;
  description: string;
}
@Component({
  selector: 'app-ip-query',
  templateUrl: './ip-query.component.html',
  styleUrls: ['./ip-query.component.css']
})
export class IpQueryComponent implements OnInit {
  // Chip input properties
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  displayedColumns: string[] = ['ipaddress', 'threat_potential_score_pct', 'threat_classification', 'blacklist_class'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('grid') grid: MatGridList;
  ipsList;
  ipsLimit;
  user;
  queryName;
  description;

  exportType = 'csv';

  constructor(
    public ipsService: IpsService,
    private observableMedia: ObservableMedia,
    private savedSearchesService: SavedSearchesService,
    private tagsService: TagsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    // Init user
    // this.route.data.subscribe(routeData => {
    //   this.user = routeData['user'];
    // })
    this.user = JSON.parse(localStorage.getItem('profile'));

    this.ipsList = [];
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

    this.queryName = '';
    this.description = '';

    this.ipsService.highRiskCircle.title = ['High', 'Risk', ''];
    this.ipsService.highRiskCircle.riskLevel = 'High';
    this.ipsService.highRiskCircle.backgroundColor = '#FDC6CB';
    this.ipsService.highRiskCircle.outerStrokeColor = '#dc3545';
    this.ipsService.highRiskCircle.radius = '70';

    this.ipsService.mediumRiskCircle.title = ['Medium', 'Risk', ''];
    this.ipsService.mediumRiskCircle.subtitle = this.ipsService.mediumRiskCount.toString();
    this.ipsService.mediumRiskCircle.riskLevel = 'Medium';
    this.ipsService.mediumRiskCircle.backgroundColor = '#FFE9A9';
    this.ipsService.mediumRiskCircle.outerStrokeColor = '#ffc107';
    this.ipsService.mediumRiskCircle.radius = '70';

    this.ipsService.lowRiskCircle.title = ['Low', 'Risk', ''];
    this.ipsService.lowRiskCircle.subtitle = this.ipsService.lowRiskCount.toString();
    this.ipsService.lowRiskCircle.riskLevel = 'Low';
    this.ipsService.lowRiskCircle.backgroundColor = '#B8ECC3';
    this.ipsService.lowRiskCircle.outerStrokeColor = '#28a745';
    this.ipsService.lowRiskCircle.radius = '70';
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

  // Save search
  save() {
    this.savedSearchesService.createSearch(this.user.email, this.ipsList, this.queryName, this.description).then(
      result => {

      },
      err => {

      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(QueryNameDialog, {
      width: '275px',
      data: {
        queryName: this.queryName,
        description: this.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.queryName = result.queryName;
        this.description = result.description;
        this.save();
      }
    });
  }

  export() {
    const fileName = `musubu_ip_details_${moment().format()}`;
    const dataToExport = this.ipsService.dataSource.data;
    if (this.exportType === 'json') {

      const blobToExport = new Blob([JSON.stringify(dataToExport)], {type: 'text/plain;charset=utf-8'});
      saveAs(blobToExport, fileName + '.json');

    } else { // exportType === 'csv'

      const header = Object.keys(dataToExport[0]);
      console.log('header:', header);
      const csv = dataToExport.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
      csv.unshift(header.join(','));
      const csvArray = csv.join('\r\n');
      const blobToExport = new Blob([csvArray], {type: 'text/csv' });
      saveAs(blobToExport, fileName + '.csv');

    }
  }

  // Clears chips
  clear() {
    this.ipsList = [];
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
  }

  // Removes chips to the textbox
  remove(ip): void {
    const index = this.ipsList.indexOf(ip);
    if (index >= 0) {
      this.ipsList.splice(index, 1);
    }
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
    if (ipsList.length !== 0) {
      this.ipsService.getIpsDetail(ipsList).then(
        results => {
          this.ipsService.dataSource.data = results.ipsDetail;
          this.ipsService.dataSource.sort = this.sort;
          results.ipsDetail.forEach(element => {
            if (element.threat_classification === 'High') {
              this.ipsService.highRiskCircle.count++;
            }
            if (element.threat_classification === 'Medium') {
              this.ipsService.mediumRiskCircle.count++;
            }
            if (element.threat_classification === 'Low') {
              this.ipsService.lowRiskCircle.count++;
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
    sm: 3,
    xs: 1
  }

  ngAfterContentInit(): void {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }
}

@Component({
  selector: 'query-name-dialog',
  templateUrl: 'query-name-dialog.html',
  styleUrls: ['ip-query.component.css']
})
export class QueryNameDialog {

  constructor(
    public dialogRef: MatDialogRef<QueryNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QueryNameDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
