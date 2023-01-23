import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from './module/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginService } from './services/login.service';
import { DialogOrderComponent } from './components/dialog-order/dialog-order.component';
import { CookieService } from 'ngx-cookie-service';




@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DialogCategoryComponent,
    HeaderComponent,
    DialogOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  LoginService, CookieService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
