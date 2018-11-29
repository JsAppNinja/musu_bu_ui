import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IpsService } from './services/ips.service';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Musubu';
  oktaSignIn;
  subscriptionPlan;
  user;
  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    public router: Router,
    public ipsService: IpsService,
    public userService: UserService) {
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("profile"));
    var isAuthenticated = this.authService.isAuthenticated();
    let self = this;

    if (isAuthenticated) {
      this.userService.getUserByEmail(this.user.email)
        .then(result => {
          this.subscriptionPlan = result[0].subscriptionPlan;
        });
    } else {
      self.authService.lock.on("authenticated", function(authResult) {
        self.authService.lock.getUserInfo(authResult.accessToken, function(error, profile) {
          if (error) {
            return;
          }
          self.userService.getUserByEmail(profile.email)
            .then(result => {
              self.subscriptionPlan = result[0].subscriptionPlan
            });
          self.userService.subscribeWithMailChimps(profile).then(
            response => {
              //User created on MailChimps
            },
            error => {
              //Error creating user on MailChimps
            }
          );
        });
      });
    }
  }

  onClickBuyApp(){
    window.open("https://musubu.io/app-pricing/", "_blank");
  }

  onClickBuy(){
    window.open("https://musubu.io/pricing/", "_blank");
  }

  logout() {
    this.authService.logout();
    this.authService.lock.logout({
      returnTo: environment.ui_url + '/login'
    });
  }
}
