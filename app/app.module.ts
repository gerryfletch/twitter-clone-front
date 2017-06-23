import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

/* Login + Signup Index */
import { HomePageComponent } from './home/homepage.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

/* JWT */
import { AuthGuard } from './_guards/auth.guards';
import { AuthenticationService } from './_services/index';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './user/logout/logout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserProfileComponent } from './components/content/user-profile/user-profile.component';
import { UserProfile404Component } from './components/content/user-profile/user-profile-404/user-profile-404.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    NavigationComponent,
    MenuComponent,
    UserProfileComponent,
    UserProfile404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
