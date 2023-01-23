import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public readonly authService: AuthService, private router: Router, public readonly loginService: LoginService) {}
  ngOnInit(): void {
    
  }


  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  public logout(){
    this.authService.clear();
    this.router.navigate(['/login']);
  }

}
