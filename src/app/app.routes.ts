import { Routes } from '@angular/router';
import { IpDetailComponent } from './ip-detail/ip-detail.component';
import { IpDetailResolver } from './ip-detail/ip-detail.resolver';
import { IpQueryComponent } from './ip-query/ip-query.component';
import { LoginComponent } from './login/login.component';
import { LoginResolver } from './login/login.resolver';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { SavedSearchesResolver } from './saved-searches/saved-searches.resolver';
import { IpQueryResolver } from './ip-query/ip-query.resolver';
import { TrendsComponent } from './trends/trends.component';
import { IpTagsComponent } from './ip-tags/ip-tags.component';
import { AdminComponent } from './admin/admin.component';
import { AdminResolver } from './admin/admin.resolver';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'query',
		component: IpQueryComponent,
		resolve: {
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'query/:queryType/:queryId',
		component: IpQueryComponent,
		resolve: {
			isAuthenticated: LoginResolver,
			queryData: IpQueryResolver,
		}
	},
	{
		path: 'searches',
		component: SavedSearchesComponent,
		resolve: {
			isAuthenticated: LoginResolver,
			data: SavedSearchesResolver,
		}
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'admin',
		component: AdminComponent,
		resolve: {
			isAuthenticated: LoginResolver,
			isAdmin: AdminResolver
		}
	},
	{
		path: 'trends',
		component: TrendsComponent,
		resolve: {
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'tags',
		component: IpTagsComponent,
		resolve: {
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'detail/:ipaddress',
		component: IpDetailComponent,
		resolve: {
			isAuthenticated: LoginResolver,
			data: IpDetailResolver
		}
	}
];