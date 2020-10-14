import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path : '',redirectTo:'Login', pathMatch:'full'},
  {path : 'SignUp',component:SignUpComponent, canActivate:[AuthGuard]},
  {path : 'LogOut',component:LoginComponent, canActivate:[AuthGuard]},
  {path : 'Dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path : 'Login',component:LoginComponent, canActivate:[AuthGuard]},
  {path : 'Profile',component:MyProfileComponent, canActivate:[AuthGuard]},
  {path : '**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
