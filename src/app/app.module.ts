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
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './user/logout/logout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserProfileComponent } from './components/content/user-profile/user-profile.component';
import { UserProfile404Component } from './components/content/user-profile/user-profile-404/user-profile-404.component';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { authHttpServiceFactory } from './_guards/auth.module';
import { ProfileComponent } from './components/content/user-profile/profile/profile.component';
import { EditProfileComponent } from './components/content/user-profile/edit-profile/edit-profile.component';
import {SelfGuard} from './_guards/self.guard';
import {UserUtilsService} from './_services/user/user-utils.service';
import {RelationshipService} from './_services/relationships/relationship.service';
import { NewTweetComponent } from './components/tweeting/new-tweet.component';
import { TagUserBarComponent } from './components/tweeting/tag-user-bar/tag-user-bar.component';
import { FeedComponent } from './components/feed/feed.component';
import { TweetComponent } from './components/feed/tweet/tweet.component';
import { PermaTweetComponent } from './components/perma-tweet/perma-tweet.component';

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
    UserProfile404Component,
    ProfileComponent,
    EditProfileComponent,
    NewTweetComponent,
    TagUserBarComponent,
    FeedComponent,
    TweetComponent,
    PermaTweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    SelfGuard,
    AuthenticationService,
    UserUtilsService,
    RelationshipService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
