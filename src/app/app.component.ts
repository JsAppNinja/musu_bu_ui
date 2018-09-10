import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Okta } from './services/okta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Musubu';
  user;
  oktaSignIn;
  constructor(private okta: Okta, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
    this.oktaSignIn = okta.getWidget();
  }

  ngOnInit() {
    this.oktaSignIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
        this.user = response.login;
        this.router.navigate(['query']);
        this.changeDetectorRef.detectChanges();
      } else {
        this.router.navigate(['login']);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  logout() {
    this.oktaSignIn.signOut(() => {
      this.user = undefined;
      this.router.navigate(['login']);
      this.changeDetectorRef.detectChanges();
    });
  }
}
