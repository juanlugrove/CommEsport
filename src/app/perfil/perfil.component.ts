import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formUser: FormGroup;
  url: string;
  userData: any;
  tengoDatos: boolean = false;
  seleccionadoPlatform=[false,false,false];
  seleccionadoPosicion=[false,false,false,false];
  seleccionadoPosicion2=[false,false,false,false];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.url = environment.urlBase;
    this.formUser=formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      platform: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    const headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.cookieService.get("key")
    })
    const requestOptions = {headers: headers};

    this.http.get(this.url+"usuarios", requestOptions)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.tengoDatos=true;
          this.userData=resultado;
          this.seleccionadoPlatform[this.userData.platform]=true;
          if(this.userData.position!=null){
            this.seleccionadoPosicion[this.marcarSeleccion(this.userData.position)]=true;
          }
          if(this.userData.secondPosition!=null){
            this.seleccionadoPosicion2[this.marcarSeleccion(this.userData.secondPosition)]=true;
          }
        }
      );
  }

  cerrarSesion(): void{
    this.authService.LogOut();
    this.router.navigate(["/unete"]).then(() => {
      window.location.reload();
    });
  }

  marcarSeleccion(posicion:string): number{
    if(posicion=="DC"){
      return 0;
    } else if(posicion=="MC"){
      return 1;
    } else if(posicion=="DF"){
      return 2;
    } else {
      return 3;
    }
  }
}
