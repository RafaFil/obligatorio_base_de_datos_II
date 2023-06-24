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
import { PostulationCardComponent } from './components/helpAplication/help-aplication-card/postulation-card.component';
import { ApplicantsSheetComponent } from './components/helpRequest/applicants-sheet/applicants-sheet.component';
import { CancelAplicationDialogComponent } from './components/helpAplication/cancel-aplication-dialog/cancel-aplication-dialog.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { FriendCardComponent } from './components/friendPage/friend-card/friend-card.component';
import { DialogAddFriendComponent } from './components/friendPage/dialog-add-friend/dialog-add-friend.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    SkillCardComponent,
    AddSkillDialogComponent,
    AddSkillFormComponent,
    HelpRequestCardComponent,
    HelpRequstInfoComponent,
    PostulationCardComponent,
    ApplicantsSheetComponent,
    CancelAplicationDialogComponent,
    FriendsPageComponent,
    FriendCardComponent,
    DialogAddFriendComponent,
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