import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
//import { Cart } from '../interface/Cart';
import { CartItem } from '../interface/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.getCartDetails();
    this.computeCartTotals();
  }
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  getCartDetails() {
    // var cookieData = this.cookieService.get('product');
    // this.cartItems = JSON.parse(cookieData);

    var cookieData = this.cookieService.getAll();
    for (const key of Object.keys(cookieData)) {
      this.cartItems.push(JSON.parse(cookieData[key]));
    }
    //  console.log(Object.keys(cookieData));
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  updateData() {
    this.computeCartTotals();
  }

  remove(cartItem: CartItem) {
    this.cartItems = this.cartItems.filter((item) => item.id !== cartItem.id);
    this.updateData();
  }

  addCookietoCart(){
    
  }
}
