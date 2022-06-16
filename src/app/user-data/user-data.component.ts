import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  loguedUsername:string ="username";
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loguedUsername=this.cookieService.get("username");
  }

}
