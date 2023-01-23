import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';



const routes: Routes = [{ path: '', component: CartComponent }];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule, CartComponent],
})
export class CartModule {}
