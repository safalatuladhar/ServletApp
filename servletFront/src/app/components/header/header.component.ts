import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/interface/cartItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalQuantity: number = 0;
  cartItems: CartItem[];

  constructor(
    public readonly authService: AuthService,
    private router: Router,
    public readonly loginService: LoginService,
    private readonly cartService: CartService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.total();
  }

  public isLoggedIn() {
    // this.cookieService.deleteAll();
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
    this.cookieService.deleteAll();
    this.cartService.cartItems = [];
    this.cartService.updateData();
    this.router.navigate(['/login']);
  }

  total() {
    this.cartService.totalQuantity.subscribe((data) => {
      this.totalQuantity = data;
    });
  }
}
