import { Component, OnInit, Inject } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounce, debounceTime, take, map } from 'rxjs/operators'
import { timer, from } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

export interface QueryNameDialogData {
  dialogName: string;
  watchlistName: string;
  watchlistDescription: string;
  submitButtonName: string;
}

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  queryName;
  watchlist=[];
  watchlistGridColumns: string[] = ['queryName', 'description', 'createdOn', 'deleteButton']

  constructor(
    private watchlistService: WatchlistService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.watchlist = data;
      }
    })
  }

  humanizeDate(date){
    return moment(date).format("LLL");
  }

  getUserSearches(){
    this.watchlistService.getUserSearches(this.userService.user.email).then(
      (result) => {
        this.watchlist = result;
      },
      (err) =>{

      }
    )
  }

  CreateWatchlistDialog(data, dialogName, type, submitButtonNAme){
    const dialogRef = this.dialog.open(CreateWatchlistDialog, {
      width: '300px',
      data: {
        watchlistData: data,
        watchlistName: data.queryName ? data.queryName : "",
        watchlistDescription: data.description ? data.description : "",
        user: this.userService.user.email,
        dialogName: dialogName,
        submitButtonName: submitButtonNAme
      }
    });

    dialogRef.keydownEvents().subscribe( result => {
      if(result.key === "Enter") {
          dialogRef.componentInstance.closeDialog();
        }
      }, err =>{

      });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(type === "update"){
          result.watchlistData.queryName = result.watchlistName;
          result.watchlistData.description = result.watchlistDescription;
          this.watchlistService.updateSearch(result.watchlistData).then(
            result => {
              this.getUserSearches();
            },
            err =>{

            }
          )
        }
      }
    });
  }

  createSearchDeleteDialog(id) {
    const dialogRef = this.dialog.open(SearchDeleteDialog, { width: '300px' });

    dialogRef.keydownEvents().subscribe(result => {
      if(result.key === "Enter"){
        dialogRef.componentInstance.closeDialog(false);
      }
    }, err =>{

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.watchlistService.deleteSearch(id).then(
          result => {
            this.getUserSearches();
          },
          err => {

          }
        );
      }
    });
  }
}

@Component({
  selector: 'create-search-dialog',
  templateUrl: 'create-search-dialog.html',
  styleUrls: ['watchlist.component.css']
})

export class CreateWatchlistDialog {
  watchlistNameInput = new FormControl(this.data.watchlistName,
    {
      updateOn: 'change',
      validators: [Validators.required],
      asyncValidators: [this.existingWatchlistValidator()]
    }
  );
  watchlistDescriptionInput = new FormControl(this.data.watchlistDescription,
    {
      updateOn: 'change',
    }
  );
  user;
  constructor(
    public dialogRef: MatDialogRef<CreateWatchlistDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QueryNameDialogData,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("profile"));
    this.watchlistDescriptionInput.valueChanges.subscribe(value => {
      this.data.watchlistDescription = value
    })
  }

  existingWatchlistValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let watchlistToValidate = "";
      if(!this.watchlistNameInput){
        watchlistToValidate = this.data.watchlistName;
      }
      else{
        watchlistToValidate = this.watchlistNameInput.value;
        this.data.watchlistName = this.watchlistNameInput.value;
      }
      if(!this.user){
        this.user = JSON.parse(localStorage.getItem("profile"));
      }
      var observable = this.watchlistService.getUserSearchByName(watchlistToValidate, this.user.email);
      return observable.pipe(debounceTime(3000),
        map(
          result => {
            return (result && result.length > 0) ? {"watchlistExists": true} : null;
          }
        )
      )
    };
  }

  getNameErrorMessage(){
    if(this.watchlistNameInput.hasError('required')){
      return 'You must enter a value.';
    }
    if(this.watchlistNameInput.hasError('watchlistExists')){
      return 'Search already exists.'
    }
    return '';
  }

  closeDialog() {
    if(!this.watchlistNameInput.invalid){
      this.data.watchlistName = this.watchlistNameInput.value;
      this.data.watchlistDescription = this.watchlistDescriptionInput.value;
      this.dialogRef.close(this.data);
    }
    else{
      this.watchlistNameInput.markAsTouched();
      this.getNameErrorMessage();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'search-delete-dialog',
  templateUrl: 'search-delete-dialog.html',
  styleUrls: ['watchlist.component.css']
})
export class SearchDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<SearchDeleteDialog>,
  ) {}

  ngOnInit() {
  }

  closeDialog(value) {
    this.dialogRef.close(value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
