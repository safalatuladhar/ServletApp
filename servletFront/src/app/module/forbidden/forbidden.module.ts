import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ForbiddenComponent } from 'src/app/components/forbidden/forbidden.component';

const routes: Routes = [
  {path: '', component: ForbiddenComponent}
]

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule, ForbiddenComponent],
})
export class ForbiddenModule {}
