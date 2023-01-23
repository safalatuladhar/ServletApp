import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.scss'],
})
export class DialogOrderComponent {
  userId: number;
  cartItems: any;
  cartCount: number;
  totalPrice: number;

  constructor(
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  // ngOnInit() {
  //   this.getCartByUserId(+this.authService.getUserId());

  //   setTimeout(() => {
  //     this.calCount();
  //   }, 100);
  // }

  // getCartByUserId(userId): void {
  //   this.cartService.getAllCartsByUserId(userId).subscribe({
  //     next: (response) => {
  //       this.cartItems = response;
  //       setTimeout(() => {
  //         this.calCount();
  //       }, 100);
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       alert(err.message);
  //     },
  //   });
  // }

  calCount(): void {
    this.totalPrice = 0;
    this.cartCount = 0;
    this.cartItems.map((cartItem) => {
      this.cartCount += cartItem.quantity;
      this.totalPrice += cartItem.product.price * this.cartCount;
    });
  }
}
