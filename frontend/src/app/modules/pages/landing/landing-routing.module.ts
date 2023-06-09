import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './components/login-form/login-form.component';

import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent, children:
    [
      { path: '', component: LandingHomeComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }