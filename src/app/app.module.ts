import {LayoutModule} from '@angular/cdk/layout';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {Angulartics2Module} from 'angulartics2';
import {environment} from '../environments/environment';
import {AppRoutes} from './app-routes';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {LandingComponent} from './landing/landing.component';
import {NavComponent} from './nav/nav.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TopNavComponent} from './top-nav/top-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TopNavComponent,
    LandingComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(AppRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected'
    }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirePerformanceModule,
    Angulartics2Module.forRoot(),
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
