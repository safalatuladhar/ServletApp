import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {}

  postLogin(formData: any) {
    console.log(formData);

    return this.http.post<any>('http://localhost:8080/login', formData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.authService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
