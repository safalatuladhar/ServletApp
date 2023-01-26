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
  ) {}

  ngOnInit(): void {}

  title = 'servletFront';

 
}
