import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../../shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingRoutingModule } from '../landing/landing-routing.module';
import { HomeRoutingModule } from './home-routing.module';
import { AddHelpAplicationComponent } from './components/add-help-aplication/add-help-aplication.component';
import { HelpAplicationFormComponent } from './components/help-aplication-form/help-aplication-form.component';
import { DialogHelpAplicationComponent } from './components/dialog-help-aplication/dialog-help-aplication.component';

@NgModule({
  declarations: [
    MapComponent,
    HomePageComponent,
    AddHelpAplicationComponent,
    HelpAplicationFormComponent,
    DialogHelpAplicationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }