import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  loguedUsername:string ="username";
  headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.cookieService.get("key")
  })
  requestOptions = {headers: this.headers};
  url: string;
  userData: any;
  notificaciones:any;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.url = environment.urlBase;
   }

  ngOnInit(): void {
    this.loguedUsername=this.cookieService.get("username");
    this.http.get(this.url+"usuarios", this.requestOptions)
    .subscribe(
      resultado => {
        // console.log(resultado);
        this.userData=resultado;
      }
    );
    this.http.get(this.url+"notifications", this.requestOptions)
    .subscribe(
      resultado => {
        // console.log(resultado);
        this.notificaciones=resultado;
      }
    );
  }

}
