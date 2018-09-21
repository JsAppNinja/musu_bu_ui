import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Okta } from './services/okta.service';
import { IpsService } from './services/ips.service';

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
    private okta: Okta, 
    private changeDetectorRef: ChangeDetectorRef, 
    public router: Router,
    public ipsService: IpsService) {
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

  onClickBuy(){
    window.open("https://musubu.io/pricing/", "_blank");
  } 

  logout() {
    this.oktaSignIn.signOut(() => {
      this.user = undefined;
      this.ipsService.clearServiceCache()
      this.router.navigate(['login']);
      this.changeDetectorRef.detectChanges();
    });
  }
}
