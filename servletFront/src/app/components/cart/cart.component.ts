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

  listCartDetails() {
    //handle cart item
    this.cartItems = this.cartService.cartItems;

    //subscribe cart totalprice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    //subsribe cart totalquantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    //compute totalprice and totalquantity
    this.cartService.computeCartTotals();
  }

  getCartDetails() {
    // var cookieData = this.cookieService.get("product");
    //this.cartDetails = JSON.parse(cookieData);

    var cookieData = this.cookieService.getAll();
    for(const key of Object.keys(cookieData)){
      this.cartItems.push(JSON.parse(cookieData[key]));
    }
  //  console.log(Object.keys(cookieData));
    
    console.log(this.cartItems);
    
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cookieService.delete("product" + theCartItem.id);
  }

  deleteCookie() {
    this.cookieService.delete('name');
  }

  deleteAll() {
    this.cookieService.deleteAll();
  }
}
