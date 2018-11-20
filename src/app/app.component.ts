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
    this.userService.getUserByEmail(this.user.email)
      .then(result => {
        this.subscriptionPlan = result[0].subscriptionPlan;
      })
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
