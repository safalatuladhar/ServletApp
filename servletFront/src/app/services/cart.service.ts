import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
//import { Cart } from '../interface/Cart';
import { CartItem } from '../interface/cartItem';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  cartItems: CartItem[] = [];

  cartCount: number;

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  addToCart(theCartItem: CartItem) {
    //check we have item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      //find item cart based on item id

      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );

      //if found
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      //increase quantity
      existingCartItem.quantity++;
    } else {
      //add item to array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price + total quantity

    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //get new value once subscriber receive new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    //get index in array
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    //if found remove
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
