import { Component, OnInit, Inject } from '@angular/core';
import { SavedSearchesService } from '../services/savedSearches.service';
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
  savedSearchName: string;
  submitButtonName: string;
}

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.css']
})
export class SavedSearchesComponent implements OnInit {
  queryName;
  savedSearches=[];
  savedSearchesGridColumns: string[] = ['queryName', 'description', 'createdOn', 'deleteButton']

  constructor(
    private savedSearchesService: SavedSearchesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.savedSearches = data;
      }
    })
  }

  humanizeDate(date){
    return moment(date).format("LLL");
  }

  getUserSearches(){
    this.savedSearchesService.getUserSearches(this.userService.user.email).then(
      (result) => {
        this.savedSearches = result;
      },
      (err) =>{

      }
    )
  }

  createSavedSearchDialog(data, dialogName, type, submitButtonNAme){
    const dialogRef = this.dialog.open(CreateSavedSearchDialog, {
      width: '300px',
      data: {
        savedSearchData: data,
        savedSearchName: data.queryName ? data.queryName : "",
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
          result.savedSearchData.queryName = result.savedSearchName
          this.savedSearchesService.updateSearch(result.savedSearchData).then(
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
        this.savedSearchesService.deleteSearch(id).then(
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
  styleUrls: ['saved-searches.component.css']
})

export class CreateSavedSearchDialog {
  savedSearchNameInput = new FormControl(this.data.savedSearchName,
    {
      updateOn: 'change',
      validators: [Validators.required],
      asyncValidators: [this.existingSavedSearchValidator()]
    }
  );
  user;
  constructor(
    public dialogRef: MatDialogRef<CreateSavedSearchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QueryNameDialogData,
    private savedSearchesService: SavedSearchesService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("profile"));
  }
}

@Component({
  selector: 'create-search-dialog',
  templateUrl: 'create-search-dialog.html',
  styleUrls: ['saved-searches.component.css']
})

export class CreateSavedSearchDialog {
  savedSearchNameInput = new FormControl(this.data.savedSearchName,
    {
      updateOn: 'change',
      validators: [Validators.required],
      asyncValidators: [this.existingSavedSearchValidator()]
    }
  );
  user;
  constructor(
    public dialogRef: MatDialogRef<CreateSavedSearchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QueryNameDialogData,
    private savedSearchesService: SavedSearchesService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("profile"));
  }


  existingSavedSearchValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let savedSearchToValidate = "";
      if(!this.savedSearchNameInput){
        savedSearchToValidate = this.data.savedSearchName;
      }
      else{
        savedSearchToValidate = this.savedSearchNameInput.value;
      }
      if(!this.user){
        this.user = JSON.parse(localStorage.getItem("profile"));
      }
      var observable = this.savedSearchesService.getUserSearchByName(savedSearchToValidate, this.user.email);
      return observable.pipe(debounceTime(3000),
        map(
          result => {
            return (result && result.length > 0) ? {"savedSearchExists": true} : null;
          }
        )
      )
    };
  }

  getErrorMessage(){
    if(this.savedSearchNameInput.hasError('required')){
      return 'You must enter a value.';
    }
    if(this.savedSearchNameInput.hasError('savedSearchExists')){
      return 'Search already exists.'
    }
    return '';
  }

  closeDialog() {
    if(!this.savedSearchNameInput.invalid){
      this.data.savedSearchName = this.savedSearchNameInput.value;
      this.dialogRef.close(this.data);
    }
    else{
      this.savedSearchNameInput.markAsTouched();
      this.getErrorMessage();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  existingSavedSearchValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let savedSearchToValidate = "";
      if(!this.savedSearchNameInput){
        savedSearchToValidate = this.data.savedSearchName;
      }
      else{
        savedSearchToValidate = this.savedSearchNameInput.value;
        this.data.savedSearchName = this.savedSearchNameInput.value;
      }
      if(!this.user){
        this.user = JSON.parse(localStorage.getItem("profile"));
      }
      var observable = this.savedSearchesService.getUserSearchByName(savedSearchToValidate, this.user.email);
      return observable.pipe(debounceTime(3000),
        map(
          result => {
            return (result && result.length > 0) ? {"savedSearchExists": true} : null;
          }
        )
      )
    };
  }

  getErrorMessage(){
    if(this.savedSearchNameInput.hasError('required')){
      return 'You must enter a value.';
    }
    if(this.savedSearchNameInput.hasError('savedSearchExists')){
      return 'Search already exists.'
    }
    return '';
  }

  closeDialog() {
    if(!this.savedSearchNameInput.invalid){
      this.data.savedSearchName = this.savedSearchNameInput.value;
      this.dialogRef.close(this.data);
    }
    else{
      this.savedSearchNameInput.markAsTouched();
      this.getErrorMessage();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'search-delete-dialog',
  templateUrl: 'search-delete-dialog.html',
  styleUrls: ['saved-searches.component.css']
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
