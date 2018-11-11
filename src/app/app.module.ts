declare var require: any;
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SDKBrowserModule } from '../../sdk/index';
import { AppComponent } from './app.component';
import { IpQueryComponent, QueryNameDialogComponent, ImportDialogComponent } from './ip-query/ip-query.component';

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
  MatDialog,
  MatSidenavModule,
  MatSelectModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatAutocompleteModule
} from '@angular/material';
import { IpDetailComponent } from './ip-detail/ip-detail.component';
import { IpDetailResolver } from './ip-detail/ip-detail.resolver';
import { IpsService } from './services/ips.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginResolver } from './login/login.resolver';
import { IpRiskCircleComponent } from './ip-risk-circle/ip-risk-circle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { SavedSearchesResolver } from './saved-searches/saved-searches.resolver';
import { IpQueryResolver } from './ip-query/ip-query.resolver';
import { TrendsComponent } from './trends/trends.component';
import { IpTagsComponent, CreateTagDialog } from './ip-tags/ip-tags.component';
import { AdminComponent, DeleteUserDialog, CreateUserDialog } from './admin/admin.component';
import { AdminResolver } from './admin/admin.resolver';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  declarations: [
    AppComponent,
    IpQueryComponent,
    IpDetailComponent,
    LoginComponent,
    IpRiskCircleComponent,
    ImportDialogComponent,
    QueryNameDialogComponent,
    SavedSearchesComponent,
    TrendsComponent,
    IpTagsComponent,
    CreateTagDialog,
    DeleteUserDialog,
    CreateUserDialog,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(routes,
    {
      useHash: false
    }
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBusR6KbRONW95CPdaTs9o9i4vM13eG1oA'
    }),
    AgmSnazzyInfoWindowModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
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
    MatSidenavModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
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
    ImportDialogComponent,
    QueryNameDialogComponent,
    MatSidenavModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatAutocompleteModule
  ],
  providers: [
    IpsService,
    IpDetailResolver,
    SavedSearchesResolver,
    IpQueryResolver,
    LoginResolver,
    AdminResolver,
    MatDialog
  ],
  entryComponents: [
    ImportDialogComponent,
    QueryNameDialogComponent,
    CreateTagDialog,
    DeleteUserDialog,
    CreateUserDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
