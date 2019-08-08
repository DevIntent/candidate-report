import {Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
  {path: '', pathMatch: 'full', component: LandingComponent, children: []},
  {path: '**', component: PageNotFoundComponent, children: []}
];
