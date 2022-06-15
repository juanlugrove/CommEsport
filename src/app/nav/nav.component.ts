import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  IsAuthenticated = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.IsAuthenticated=this.authService.isLogin();
  }

}
