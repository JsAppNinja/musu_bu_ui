import { Component, ChangeDetectorRef, OnInit, NgZone } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app';
  user;
  oktaSignIn;
  constructor(private authService: AuthService, private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private zone:NgZone) { 

  }

  ngOnInit() {
    var authService = this.authService;
    var zone = this.zone;
    var router = this.router;
    var changeDetectorRef = this.changeDetectorRef;
    var userService = this.userService;

    //If user is already logged in, redirect
    var isAuthenticated = this.authService.isAuthenticated();
    if(isAuthenticated){
      router.navigate(['query']);
      changeDetectorRef.detectChanges();
    }
    else{
      authService.lock.show();
      // Listen for the authenticated event and get profile
      authService.lock.on("authenticated", function(authResult) {
        authService.lock.getUserInfo(authResult.accessToken, function(error, profile) {
            if (error) {
                return;
            }
            //Try creating the user with MailChimps.
            userService.subscribeWithMailChimps(profile).then(
                response => {
                //User created on MailChimps
                },
                error => {
                //Error creating user on MailChimps
                }
            );
            authService.setSession(authResult, profile);
            router.navigate(['query']);
            changeDetectorRef.detectChanges();
            // Update DOM
        });
      });
    }
  }

  logout() {
    this.authService.logout();
    this.zone.run(() => this.router.navigate(['query']));
  }

}
