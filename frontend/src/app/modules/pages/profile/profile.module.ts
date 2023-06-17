import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SkillCardComponent } from './components/abilities/skill-card/skill-card.component';
import { AddSkillDialogComponent } from './components/abilities/add-skill-dialog/add-skill-dialog.component';
import { AddSkillFormComponent } from './components/abilities/add-skill-form/add-skill-form.component';
import { HelpRequestCardComponent } from './components/helpRequest/help-request-card/help-request-card.component';
import { HelpRequstInfoComponent } from './components/helpRequest/help-requst-info/help-requst-info.component';
import { HelpAplicationCardComponent } from './components/helpAplication/help-aplication-card/help-aplication-card.component';
import { ApplicantsSheetComponent } from './components/helpRequest/applicants-sheet/applicants-sheet.component';
import { CancelAplicationDialogComponent } from './components/helpAplication/cancel-aplication-dialog/cancel-aplication-dialog.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    SkillCardComponent,
    AddSkillDialogComponent,
    AddSkillFormComponent,
    HelpRequestCardComponent,
    HelpRequstInfoComponent,
    HelpAplicationCardComponent,
    ApplicantsSheetComponent,
    CancelAplicationDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }