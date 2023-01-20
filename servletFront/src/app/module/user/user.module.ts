import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from 'src/app/components/user/user.component';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  {path: '', component: UserComponent}
]

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule, UserComponent],
})
export class UserModule {}
