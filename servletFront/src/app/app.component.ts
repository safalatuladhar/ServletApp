import { Component, OnInit } from '@angular/core';
import { CartItem } from './interface/cartItem';
import { CartService } from './services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  totalQuantity: number = 0;
  cartItems: CartItem[];

  constructor(
    private readonly cartService: CartService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  title = 'servletFront';

  getCartDetails() {
    var cookieData = this.cookieService.getAll();
    for (const key of Object.keys(cookieData)) {
      this.cartItems.push(JSON.parse(cookieData[key]));
    }

    this.total();

    console.log(this.cartItems);
  }

  total() {
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
}
