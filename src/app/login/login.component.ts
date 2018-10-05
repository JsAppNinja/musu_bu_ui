import { Component, ChangeDetectorRef, OnInit, NgZone } from '@angular/core';
import { Okta } from '../services/okta.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app';
  user;
  oktaSignIn;
  constructor(private okta: Okta, private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private zone:NgZone) { 
    this.oktaSignIn = okta.getWidget();
  }

  showLogin() {
    this.oktaSignIn.renderEl({el: '#okta-login-widget'}, (response) => {
      if (response.status === 'SUCCESS') {
        //Get user object from Okta
        this.userService.getOktaUser(response.claims.sub).then(
          results =>{
            this.user = results.user;
          }
        )
        this.oktaSignIn.remove();
        this.zone.run(() => this.router.navigate(['query']));
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnInit() {
    this.oktaSignIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
        this.user = response.login;
        this.zone.run(() => this.router.navigate(['query']));
        this.changeDetectorRef.detectChanges();
      } else {
        this.changeDetectorRef.detectChanges();
        this.showLogin();
      }
    });
  }

  logout() {
    this.oktaSignIn.signOut(() => {
      this.user = undefined;
      this.changeDetectorRef.detectChanges();
      this.showLogin();
    });
  }

}
