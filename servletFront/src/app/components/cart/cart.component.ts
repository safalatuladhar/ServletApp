import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
//import { Cart } from 'src/app/interface/Cart';
import { CartService } from 'src/app/services/cart.service';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/interface/cartItem';

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

  constructor(
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getCartDetails();
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

  getCartDetails() {
    // var cookieData = this.cookieService.get("product");
    //this.cartDetails = JSON.parse(cookieData);

    var cookieData = this.cookieService.getAll();
    for (const key of Object.keys(cookieData)) {
      this.cartItems.push(JSON.parse(cookieData[key]));
    }
    //  console.log(Object.keys(cookieData));

    this.total();

    console.log(this.cartItems);
  }

  total() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.cartService.computeCartTotals(this.cartItems);
  }

  remove(theCartItem: CartItem) {
    this.cookieService.delete('product' + theCartItem.id);
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.id !== theCartItem.id
    );

    this.total();
  }

  quantityList(quantity, theCartItem: CartItem) {
    var cookieData = JSON.parse(
      this.cookieService.get('product' + theCartItem.id)
    );
    console.log(cookieData);

    cookieData.quantity = parseInt(quantity);

    this.cartItems.forEach((item) => {
      if (item.id === theCartItem.id) {
        item.quantity = parseInt(quantity);
      }
    });

    this.cookieService.set(
      'product' + theCartItem.id,
      JSON.stringify(cookieData)
    );

    this.total();
  }
}
