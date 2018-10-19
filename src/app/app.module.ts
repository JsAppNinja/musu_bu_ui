declare var require: any;
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SDKBrowserModule } from '../../sdk/index';
import { AppComponent } from './app.component';
import { IpQueryComponent, QueryNameDialog } from './ip-query/ip-query.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatCardModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatGridListModule,
  MatTableModule,
  MatInputModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule,
  MatSortModule,
  MatChipsModule,
  MatDialogModule,
  MatDialog
} from '@angular/material';
import { IpDetailComponent } from './ip-detail/ip-detail.component';
import { IpDetailResolver } from './ip-detail/ip-detail.resolver';
import { IpsService } from './services/ips.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginResolver } from './login/login.resolver';
import { IpRiskCircleComponent } from './ip-risk-circle/ip-risk-circle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IpQueryComponent,
    IpDetailComponent,
    LoginComponent,
    IpRiskCircleComponent,
    QueryNameDialog
  ],
  imports: [
    RouterModule.forRoot(routes,
    { 
      useHash: false
    }
    ),
    FormsModule,
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    MatChipsModule,
    MatDialogModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    FlexLayoutModule,
    SDKBrowserModule.forRoot()
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    QueryNameDialog
  ],
  providers: [
    IpsService,
    IpDetailResolver,
    LoginResolver,
    MatDialog
  ],
  entryComponents:[
    QueryNameDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
