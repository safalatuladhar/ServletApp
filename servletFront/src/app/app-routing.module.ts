import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () =>
      import('./module/product/product.module').then(
        (m) => m.ProductModule
      ),
  },

  {
    path: 'category',
    loadChildren: () =>
    import('./module/category/category.module').then(
      (m) => m.CategoryModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }