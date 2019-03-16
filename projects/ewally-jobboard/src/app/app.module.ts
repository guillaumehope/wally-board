import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CandidatLoginInterceptor } from './candidat/auth-interceptor';
import { CandidatGuard } from './candidat/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './error-interceptor';

import { CandidatSignupComponent } from './candidat/candidat-signup/candidat-signup.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CandidatSignupComponent],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CandidatLoginInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    CandidatGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
