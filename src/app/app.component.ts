import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IpsService } from './services/ips.service';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Musubu';
  user;
  oktaSignIn;
  
  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef, 
    public router: Router,
    public ipsService: IpsService) {
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
