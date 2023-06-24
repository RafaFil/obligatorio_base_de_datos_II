import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HelpRequstInfoComponent } from './components/helpRequest/help-requst-info/help-requst-info.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';



const routes: Routes = [
  {
    path: '', component: ProfilePageComponent
  },
  {

    path: 'helprequest/:id', component: HelpRequstInfoComponent 
  },
  {
    path: 'friends', component: FriendsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }