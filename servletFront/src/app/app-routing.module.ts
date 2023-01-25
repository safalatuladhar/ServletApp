import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: "home", pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./module/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'product',
    loadChildren: () =>
      import('./module/product/product.module').then((m) => m.ProductModule),
  },

  {
    path: 'category',
    loadChildren: () =>
      import('./module/category/category.module').then((m) => m.CategoryModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./module/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'cart',
    loadChildren: () =>
      import('./module/cart/cart.module').then((m) => m.CartModule),
  },

  {
    path: 'forbidden',
    loadChildren: () =>
      import('./module/forbidden/forbidden.module').then(
        (m) => m.ForbiddenModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
