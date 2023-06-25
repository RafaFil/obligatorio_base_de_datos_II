import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './modules/core/guards/validate-token.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/pages/landing/landing.module').then( m => m.LandingModule ),
  },
  {
    path: "home",
    loadChildren: () => import('./modules/pages/home/home.module').then( m => m.HomeModule ),
    canLoad : [ValidateTokenGuard],
    canActivate: [ValidateTokenGuard]
  },
  {
    path: "profile",
    loadChildren: () => import('./modules/pages/profile/profile.module').then(m => m.ProfileModule),
    canLoad : [ValidateTokenGuard],
    canActivate: [ValidateTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
