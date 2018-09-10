import { Routes } from '@angular/router';
import { IpDetailComponent } from './ip-detail/ip-detail.component';
import { IpDetailResolver } from './ip-detail/ip-detail.resolver';
import { IpQueryComponent } from './ip-query/ip-query.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/login', 
		pathMatch: 'full' 
	},
	{
		path: 'query',
		component: IpQueryComponent
	},
	{
	    path: 'login',
	    component: LoginComponent
	},
	{
	    path: 'detail/:ipaddress',
	    component: IpDetailComponent,
	    resolve: {
	      data: IpDetailResolver
	  	}
	}
];