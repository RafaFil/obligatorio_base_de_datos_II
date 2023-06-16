import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HelpRequstInfoComponent } from './components/helpRequest/help-requst-info/help-requst-info.component';



const routes: Routes = [
  {
    path: '', component: ProfilePageComponent,children:
    [
      //podria cambiarse por id de la solicitud
      { path:'helprequest/:title', component: HelpRequstInfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }