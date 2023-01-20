import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //admin

  postProduct(formData: FormData) {
    console.log(formData);

    return this.http.post<any>(
      'http://localhost:8080/admin/product/',
      formData
    );
  }

  putProduct(formData: FormData, id: number) {
    return this.http.put<any>(
      'http://localhost:8080/admin/product/' + id,
      formData
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(
      'http://localhost:8080/admin/product/' + id
    );
  }

  // user
  getProduct() {
    return this.http.get<any>('http://localhost:8080/user/product/');
  }
}
