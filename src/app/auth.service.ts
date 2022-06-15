import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) {
   }

  Login(username:string, key:string){
    this.cookieService.set("username", username,0.04);
    this.cookieService.set("key", key,0.04);
  }

  LogOut(){
    this.cookieService.delete("username");
    this.cookieService.delete("key");
  }
  isLogin(){
    if(this.cookieService.get("key")){
      return true;
    } else{
      return false;
    }
  }
}
