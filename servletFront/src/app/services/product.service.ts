import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //admin

  postProduct(data: any) {
    console.log(data);
    return this.http.post<any>('http://localhost:8080/Servlet/admin/product', data);
    
  }

  putProduct(data: any, id: number) {
    return this.http.put<any>('http://localhost:8080/Servlet/admin/product/' + id,data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:8080/Servlet/admin/product/' + id);
  }

  // user
  getProduct() {
    return this.http.get<any>('http://localhost:8080/Servlet/user/product/');
  }
}
