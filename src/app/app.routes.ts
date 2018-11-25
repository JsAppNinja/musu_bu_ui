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
import { GmapComponent } from './gmap/gmap.component';
import { GmapResolver } from './gmap/gmap.resolver';
import { AdminComponent } from './admin/admin.component';
import { AdminResolver } from './admin/admin.resolver';
import { IpRangesComponent } from './ip-ranges/ip-ranges.component';
import { IpRangesResolver } from './ip-ranges/ip-ranges.resolver';

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
		path: 'network-name/:networkName',
		component: IpRangesComponent,
		resolve: {
			ipRanges: IpRangesResolver,
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'network-type/:networkType',
		component: IpRangesComponent,
		resolve: {
			ipRanges: IpRangesResolver,
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'isp-name/:ispName',
		component: IpRangesComponent,
		resolve: {
			ipRanges: IpRangesResolver,
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'network-group/:networkGroup',
		component: IpRangesComponent,
		resolve: {
			ipRanges: IpRangesResolver,
			isAuthenticated: LoginResolver
		}
	},
	{
		path: 'blacklist-neighbors/:blacklistNeighbors',
		component: IpRangesComponent,
		resolve: {
			ipRanges: IpRangesResolver,
			isAuthenticated: LoginResolver
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
		path: 'map',
		component: GmapComponent,
		resolve: {
			isLargePlanUser: GmapResolver
		}
	},
	{
		path: 'map/:queryType/:queryId',
		component: GmapComponent,
		resolve: {
			queryData: IpQueryResolver,
			isAuthenticated: LoginResolver,
			isLargePlanUser: GmapResolver
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
