import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  //admin

  postCategory(data: any) {
    return this.http.post<any>(
      'http://localhost:8080/Servlet/admin/category/', data);
  }

  putCategory(data: any, id: number) {
    return this.http.put<any>(
      'http://localhost:8080/Servlet/admin/category/' + id,
      data
    );
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(
      'http://localhost:8080/Servlet/admin/category/' + id
    );
  }

  // user
  getCategory() {
    return this.http.get<any>('http://localhost:8080/Servlet/user/category/');
  }
}
