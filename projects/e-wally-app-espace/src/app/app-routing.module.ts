import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './candidat/dashboard/dashboard.component';
import { ProfileComponent } from './candidat/profile/profile.component';
import { CandidatLoginComponent } from './candidat/login/candidat-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CandidatGuard } from './candidat/auth.guard';

import { Routes, RouterModule } from '@angular/router';
import { CandidatSignupComponent } from './candidat/candidat-signup/candidat-signup.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [CandidatGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CandidatGuard]
  },
  {
    path: 'monprofil',
    component: ProfileComponent,
    canActivate: [CandidatGuard]
  },
  { path: 'login', component: CandidatLoginComponent },
  { path: 'signup', component: CandidatSignupComponent }
];

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  declarations: [DashboardComponent, ProfileComponent, CandidatLoginComponent],
  exports: [RouterModule]
})
export class AppRoutingModule {}
