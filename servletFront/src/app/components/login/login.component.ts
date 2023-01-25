import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly authService: AuthService ,
    private readonly cookieService: CookieService,
    private readonly cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    this.loginService.postLogin(this.loginForm.value).subscribe(
      (response ) => {
        this.authService.setRoles(response.user.roles);
        this.authService.setToken(response);
        this.authService.setUsername(response.user.username)
        console.log(response);
        this.cookieService.deleteAll();
        this.cartService.cartItems = [];
        this.cartService.updateData();
        

        
        const role = response.user.roles[0];
        if(role === 'Admin'){
          this.router.navigate(['/product']);
        }else{
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
