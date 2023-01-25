import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/interface/cartItem';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: any;
  products: Product[];
  cartForm: FormGroup;
  cartItem: CartItem[] = [];
  productDetails: CartItem;

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cartService: CartService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartForm = this.formBuilder.group({
      user: ['', Validators.required],
      product: ['', Validators.required],
      quantity: [1],
    });

    this.getAllProduct();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategory().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        alert('error fetching records');
      },
    });
  }

  getAllProduct() {
  
    this.productService.getProduct().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err) => {
        alert('error fetching records');
      },
    });
  }

  addCookie(product: Product) {
   const dateNow = new Date();
   dateNow.setDate(dateNow.getDate() + 2);
   
    this.productDetails = { ...product, quantity: 1 };
    if (this.cookieService.check('product' + product.id)) {
      var cookieData = JSON.parse(
        this.cookieService.get('product' + product.id)
      );
      cookieData.quantity++;

      this.cookieService.set(
        'product' + product.id,
        JSON.stringify(cookieData),
        dateNow
      );
      const cartItemCopy = [...this.cartService.cartItems];
      cartItemCopy.forEach((item) => {
        if (item.id === this.productDetails.id) {
          item.quantity++;
        }
      });
      this.cartService.cartItems = [...cartItemCopy];
    } else {
      this.cookieService.set(
        'product' + product.id,
        JSON.stringify(this.productDetails),
        dateNow
      );
      this.cartService.cartItems.push(this.productDetails);
    }
    this.cartService.updateData();
    this.snackBar.open('Cart added!', 'Close');
  }

  // addToCart(product: Product) {
  //   this.productDetails = { ...product, quantity: 1 };
  //   if (this.cookieService.check('product')) {
  //     var cookieData = this.cookieService.get('product');
  //     this.cartItem = JSON.parse(cookieData);

  //     if (
  //       this.cartItem.find((element) => element.id === this.productDetails.id)
  //     ) {
  //       this.cartItem.forEach((item) => {
  //         if (item.id === this.productDetails.id) {
  //           item.quantity++;
  //         }
  //       });
  //     } else {
  //       this.cartItem.push(this.productDetails);
  //     }
  //     console.log(this.cartItem);
  //     this.cookieService.set('product', JSON.stringify(this.cartItem));
  //   } else {
  //     this.cartItem.push(this.productDetails);

  //     this.cookieService.set('product', JSON.stringify(this.cartItem));
  //   }

  //   this.snackBar.open('cart added', 'successfully');
  //   //console.log(productDetails);
  // }
}
