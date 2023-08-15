import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./_pages/home/home.module').then(m=> m.HomeModule)
  },
  {
    path: 'daftar',
    loadChildren: () => import('./_pages/form-registration/form-registration.module').then(m=> m.FormRegistrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
