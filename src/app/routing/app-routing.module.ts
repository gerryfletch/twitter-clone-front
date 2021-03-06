import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_guards/auth.guards';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {HomePageComponent} from '../home/homepage.component';
import {LogoutComponent} from '../user/logout/logout.component';
import {MenuComponent} from '../components/menu/menu.component';
import {UserProfileComponent} from '../components/content/user-profile/user-profile.component';
import {EditProfileComponent} from '../components/content/user-profile/edit-profile/edit-profile.component';
import {SelfGuard} from '../_guards/self.guard';
import {PermaTweetComponent} from '../components/perma-tweet/perma-tweet.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signup',
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: HomePageComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'user/:handle',
        component: UserProfileComponent
      },
      {
        path: 'user/:handle/edit',
        component: EditProfileComponent,
        canActivate: [SelfGuard]
      },
      {
        path: 'tweet/:hashid',
        component: PermaTweetComponent,
      }
    ]
  },

  // 404 - redirect to home
  {path: '**', redirectTo: 'signup'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
