import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { TagsService } from '../services/tags.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounce, debounceTime, take, map } from 'rxjs/operators'
import { timer, from } from 'rxjs'

export interface QueryNameDialogData {
  dialogName: string;
  tagName: string;
  submitButtonName: string;
}

@Component({
  selector: 'app-ip-tags',
  templateUrl: './ip-tags.component.html',
  styleUrls: ['./ip-tags.component.css']
})
export class IpTagsComponent implements OnInit {
  tagsGridColumns: string[] = ['name', 'date', 'viewButton', 'options']
  tags;
  user;
  constructor(
    private tagsService: TagsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("profile"));
    this.getUserTags();
  }

  getUserTags(){
    this.tagsService.getUserTags(this.user.email).then(
      (result) => {
        this.tags = result;
      },
      (err) =>{

      }
    )
  }

  createTagDialog(data, dialogName, type, submitButtonNAme){
    const dialogRef = this.dialog.open(CreateTagDialog, {
      width: '300px',
      data: {
        tagData: data,
        tagName: data.name ? data.name : "",
        user: this.user.email,
        dialogName: dialogName,
        submitButtonName: submitButtonNAme
      }
    });

    dialogRef.keydownEvents().subscribe( result => {
      if(result.key === "Enter"){
        dialogRef.componentInstance.closeDialog();
      }
    }, err =>{

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(type === "create"){
          this.tagsService.createTag(result.tagName, this.user.email, []).then(
            result => {
              this.getUserTags();
            },
            err => {
  
            }
          );
        }
        if(type === "update"){
          result.tagData.name = result.tagName
          this.tagsService.updateTag(result.tagData).then(
            result => {
              this.getUserTags();
            },
            err =>{
      
            }
          )
        }
        
      }
    });
  }

  deleteTag(id){
    this.tagsService.deleteTag(id).then(
      result => {
        this.getUserTags();
      },
      err => {

      }
    );
  }

  humanizeDate(date){
    return moment(date).format("LLL");
  }

}

@Component({
  selector: 'create-tag-dialog',
  templateUrl: 'create-tag-dialog.html',
  styleUrls: ['ip-tags.component.css']
})
export class CreateTagDialog {
  tagNameInput = new FormControl(this.data.tagName, 
    { 
      updateOn: 'change', 
      validators: [Validators.required],
      asyncValidators: [this.existingTagValidator()]
    }
  );
  user;
  constructor(
    public dialogRef: MatDialogRef<CreateTagDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QueryNameDialogData,
    private tagsService: TagsService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("profile"));
  }


  existingTagValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let tagToValidate = "";
      if(!this.tagNameInput){
        tagToValidate = this.data.tagName;
      }
      else{
        tagToValidate = this.tagNameInput.value;
      }
      if(!this.user){
        this.user = JSON.parse(localStorage.getItem("profile"));
      }
      var observable = this.tagsService.getUserTagByName(tagToValidate, this.user.email);
      return observable.pipe(debounceTime(3000),
        map(
          result => {
            return (result && result.length > 0) ? {"tagExists": true} : null;
          }
        )
      )
    };
  } 

  getErrorMessage(){
    if(this.tagNameInput.hasError('required')){
      return 'You must enter a value.';
    }
    if(this.tagNameInput.hasError('tagExists')){
      return 'Tag already exists.'
    }
    return '';
  }

  closeDialog() {
    if(!this.tagNameInput.invalid){
      this.data.tagName = this.tagNameInput.value;
      this.dialogRef.close(this.data);
    }
    else{
      this.tagNameInput.markAsTouched();
      this.getErrorMessage();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}