 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
  }

  public getToken(): any {
    return JSON.parse(localStorage.getItem('jwtToken'));
  }

  public setUsername(username) {
    localStorage.setItem('username', username);
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public setUserId(userId: number) {
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  public getUserId(): string {
    return localStorage.getItem('userId');
  }
}
