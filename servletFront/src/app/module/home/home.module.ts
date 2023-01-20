import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule, HomeComponent],
})
export class HomeModule { }
