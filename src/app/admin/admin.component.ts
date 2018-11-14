import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { User } from 'sdk';

export interface DeleteUserDialogData {
  user: object;
}

export interface CreateUserDialogData {
  user: User;
  subscriptionPlans: object;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog) { }
  currentUser;
  users;
  subscriptionPlans;
  usersGridColumns: string[] = ['email', 'subscriptionPlan', 'isAdmin', 'deleteButton'];

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("profile"));
    let userEmail = user.email
    this.userService.getUserByEmail(userEmail)
    .then(result => {
      this.currentUser = result[0];
    }, err =>{

    })

    this.getUsers();
    this.userService.getSubscriptionPlans()
    .then(result => {
      this.subscriptionPlans = result;
    }, err => {

    });
  }

  getUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
    }, err => {

    });
  }

  planChange(user, element){
    var oldSubscriptionPlan = user.subscriptionPlan;
    user.subscriptionPlan = element.value;
    this.updateUser(user);
  }

  updateUser(user){
    this.userService.updateSubscriptionPlan(user)
    .then(result => {
      this.getUsers();
    }, err => {
      //if unsuccessful, make sure we still reset values
      this.getUsers();
    })
  }

  openCreateDialog(): void {
    var newUser = new User();
    const dialogRef = this.dialog.open(CreateUserDialog, {
      width: '325px',
      data: {
        user: newUser,
        subscriptionPlans: this.subscriptionPlans
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userService.createUser(result.user)
        .then(result =>{
          this.getUsers();
        }, err => {

        });
      }
    });
  }

  openDeleteDialog(user): void {
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      width: '275px',
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userService.deleteUser(result.user)
        .then(result =>{
          this.getUsers();
        }, err => {

        });
      }
    });
  }

}

@Component({
  selector: 'delete-user-dialog',
  templateUrl: 'delete-user-dialog.html',
  styleUrls: ['admin.component.css']
})
export class DeleteUserDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteUserDialogData
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'create-user-dialog',
  templateUrl: 'create-user-dialog.html',
  styleUrls: ['admin.component.css']
})
export class CreateUserDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateUserDialogData
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPlanSubscriptionSelect(){

  }

  onIsAdminCheck(){

  }

}