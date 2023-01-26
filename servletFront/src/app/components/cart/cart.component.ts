import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
//import { Cart } from 'src/app/interface/Cart';
import { CartService } from 'src/app/services/cart.service';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/interface/cartItem';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  cartCount: number;
  productDetails: CartItem;

  constructor(
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.total();
  }

  openDialog() {
    this.dialog
      .open(DialogOrderComponent, {
        width: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          alert('ok');
        }
      });
  }

  total() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe((data) => (this.totalQuantity = data));
  }

  getCartItems(): CartItem[] {
    return this.cartService.cartItems;
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

  quantityList(quantity, theCartItem: CartItem) {
    this.cartService.addQuantityListToCookie(quantity, theCartItem);
    this.total();
  }
}
