import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LandingCarrouselComponent } from './components/landing-carrousel/landing-carrousel.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LandingPageComponent,
    LandingHomeComponent,
    SignupFormComponent,
    LandingCarrouselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }