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
    // this.getCartDetails();
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

  getCartItems(): CartItem[] {
    return this.cartService.cartItems;
  }

  total() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    // this.cartService.computeCartTotals(this.cartItems);
  }

  remove(theCartItem: CartItem) {
    this.cookieService.delete('product' + theCartItem.id);
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.id !== theCartItem.id
    );
    this.cartService.remove(theCartItem);

    // this.total();
  }

  quantityList(quantity, theCartItem: CartItem) {
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 2);

    var cookieData = JSON.parse(
      this.cookieService.get('product' + theCartItem.id)
    );
    console.log(cookieData);

    cookieData.quantity = parseInt(quantity);

    const cartItemCopy = [...this.cartService.cartItems];
    this.cartService.cartItems.forEach((item) => {
      if (item.id === theCartItem.id) {
        item.quantity++;
      }
    });
    this.cartService.cartItems = [...cartItemCopy];
    this.cartService.updateData();
    this.cookieService.set(
      'product' + theCartItem.id,
      JSON.stringify(cookieData),
      dateNow
    );

    this.total();
  }

  // removeSecond(theCartItem: CartItem) {
  //   var cookieData = this.cookieService.get('product');
  //   this.cartItems = JSON.parse(cookieData);

  //   this.cartItems = this.cartItems.filter(
  //     (cartItem) => cartItem.id !== theCartItem.id
  //   );

  //   this.cookieService.set('product', JSON.stringify(this.cartItems));

  //   this.total();

  //   console.log('remove');
  // }

  // quantityUpdateSecond(quantity: any, cardId: number) {
  //   var cookieData = this.cookieService.get('product');
  //   this.cartItems = JSON.parse(cookieData);

  //   this.cartItems.forEach((item) => {
  //     if (item.id === cardId) {
  //       item.quantity = parseInt(quantity);
  //     }
  //     this.cookieService.set('product', JSON.stringify(this.cartItems));

  //     this.total();
  //   });
  // }
}
