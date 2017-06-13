import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../user/signup/signup.component';
import { LoginComponent } from '../user/login/login.component';
import {AuthGuard} from '../_guards/auth.guards';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {HomePageComponent} from '../user/home/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'signup', component: HomePageComponent, data: {show: false} },
  { path: 'login', component: HomePageComponent, data: {show: true}},
  { path: 'dashboard', component: DashboardComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: 'signup'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
