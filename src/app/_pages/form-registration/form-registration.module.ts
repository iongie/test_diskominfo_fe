import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegistrationComponent } from './form-registration.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: FormRegistrationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class FormRegistrationModule { }
