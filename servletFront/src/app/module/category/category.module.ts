import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { MaterialModule } from '../material/material.module';


const routes: Routes = [{
  path: "", component: CategoryComponent
}
];



@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule, MaterialModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule, CategoryComponent],
})
export class CategoryModule { }
