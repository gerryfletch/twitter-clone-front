import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';

/* JWT */
import { AuthGuard } from './_guards/auth.guards';
import { AuthenticationService, UserService } from './_services/index';
import { HttpModule } from '@angular/http';
import {HomePageComponent} from './user/home/homepage.component';
import {FormsComponent} from './user/forms/forms.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    FormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
