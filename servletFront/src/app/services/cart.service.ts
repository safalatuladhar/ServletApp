import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../interface/cartItem';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.getCartDetails();
    this.updateData();
  }

  productDetails: CartItem;
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  getCartDetails() {
    if (this.cookieService.check('product')) {
      var cookieData = this.cookieService.get('product');
      this.cartItems = JSON.parse(cookieData);
      return this.cartItems;
    }

    // var cookieData = this.cookieService.getAll();
    // for (const key of Object.keys(cookieData)) {
    //   this.cartItems.push(JSON.parse(cookieData[key]));
    // }
    //  console.log(Object.keys(cookieData));
  }

  updateData() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  remove(cartItem: CartItem) {
    this.cartItems = this.cartItems.filter((item) => item.id !== cartItem.id);
    this.cookieService.set('product', JSON.stringify(this.cartItems));
    this.updateData();
  }

  addQuantityListToCookie(quantity, theCartItem: CartItem) {
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 2);
    this.cartItems = this.getCartDetails();
    this.cartItems.forEach((item) => {
      if (item.id === theCartItem.id) {
        item.quantity = parseInt(quantity);
      }
    });

    this.updateData();
    this.cookieService.set('product', JSON.stringify(this.cartItems), dateNow);
  }

  addItemToCookie(product: Product) {
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 3);

    this.productDetails = { ...product, quantity: 1 };
    this.cartItems = this.getCartDetails();
    this.cartItems = [];
    //console.log(this.getCartDetails());
    
    var isExist = this.cartItems.find(
      (element) => element.id === this.productDetails.id
    );
    if (!this.cookieService.check('product') || !isExist) {
      this.cartItems.push(this.productDetails);
    } else {
      if (isExist) {
        this.cartItems.forEach((item) => {
          if (item.id === this.productDetails.id) {
            item.quantity++;
          }
        });
      }
    }
    this.cookieService.set('product', JSON.stringify(this.cartItems), dateNow);
    this.updateData();
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

  // addCookie(product: Product) {
  //  const dateNow = new Date();
  //  dateNow.setDate(dateNow.getDate() + 2);

  //   this.productDetails = { ...product, quantity: 1 };
  //   if (this.cookieService.check('product' + product.id)) {
  //     var cookieData = JSON.parse(
  //       this.cookieService.get('product' + product.id)
  //     );
  //     cookieData.quantity++;

  //     this.cookieService.set(
  //       'product' + product.id,
  //       JSON.stringify(cookieData),
  //       dateNow
  //     );
  //     const cartItemCopy = [...this.cartService.cartItems];
  //     cartItemCopy.forEach((item) => {
  //       if (item.id === this.productDetails.id) {
  //         item.quantity++;
  //       }
  //     });
  //     this.cartService.cartItems = [...cartItemCopy];
  //   } else {
  //     this.cookieService.set(
  //       'product' + product.id,
  //       JSON.stringify(this.productDetails),
  //       dateNow
  //     );
  //     this.cartService.cartItems.push(this.productDetails);
  //   }
  //   this.cartService.updateData();
  //   this.snackBar.open('Cart added!', 'Close');
  // }
}
