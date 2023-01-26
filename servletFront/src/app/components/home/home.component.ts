import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/interface/cartItem';
import { MatSnackBar} from '@angular/material/snack-bar';

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

  addToCart(product: Product) {
    this.cartService.addItemToCookie(product);
    this.snackBar.open('cart added!', 'Close', { duration: 2000 });
  }

}
