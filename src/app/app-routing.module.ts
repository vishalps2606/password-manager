import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path : '', component: LoginComponent},
  { path : 'register', component: RegisterComponent},
  { path : 'sites', component: SiteListComponent, canActivate: [authGuard]},
  { path : 'passwords', component : PasswordListComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
