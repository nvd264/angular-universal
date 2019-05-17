import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, from } from 'apollo-link';
import { CookieModule, CookieService } from '@gorniv/ngx-universal';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { HomeModule } from '@modules/home/home.module';
import { environment } from '@environments/environment';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    AppRoutes,
    TransferHttpCacheModule,
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    CookieModule.forRoot(),
    HomeModule,
    CoreModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: environment.API_URL + '/graphql' });

    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      // we assume `headers` as a defined instance of HttpHeaders
      operation.setContext(({ headers }) => ({
        headers: headers.append('Authorization', localStorage.getItem('token') || null),
      }));

      return forward(operation);
    })

    apollo.create({
      link: from([authMiddleware, http]),
      cache: new InMemoryCache()
    });
  }
}
