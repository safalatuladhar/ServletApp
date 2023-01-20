import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  {path: '', component: AdminComponent}
]

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule, AdminComponent],
})
export class AdminModule {}
