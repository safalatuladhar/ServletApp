import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from 'src/app/components/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  { path: '', component: ProductComponent }
];

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule, ProductComponent],
})
export class ProductModule {}
