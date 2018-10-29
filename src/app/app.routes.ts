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
			queryData: IpQueryResolver,
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'searches',
		component: SavedSearchesComponent,
		resolve: {
			data: SavedSearchesResolver,
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'trends',
		component: TrendsComponent
	},
	{
		path: 'tags',
		component: IpTagsComponent
	},
	{
		path: 'detail/:ipaddress',
		component: IpDetailComponent,
		resolve: {
			data: IpDetailResolver,
			isAuthenticated: LoginResolver
		}
	}
];