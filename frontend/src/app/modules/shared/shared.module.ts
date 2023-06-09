import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDialogComponent } from './components/base-dialog/base-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    BaseDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    BaseDialogComponent
  ]
})
export class SharedModule { }