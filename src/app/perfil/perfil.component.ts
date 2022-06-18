import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

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
  prueba={twitter:"p2p"};
  headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.cookieService.get("key")
  })
  requestOptions = {headers: this.headers};
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.url = environment.urlBase;
    this.formUser=formBuilder.group({
      platform: ['', Validators.required],
      twitter: [''],
      position: [''],
      secondPosition: [''],
    });
   }

  ngOnInit(): void {
    this.http.get(this.url+"usuarios", this.requestOptions)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.tengoDatos=true;
          this.userData=resultado;
          this.seleccionadoPlatform[this.userData.platform]=true;
          if(this.userData.position!=null){
            this.seleccionadoPosicion[this.userData.position]=true;
          }
          if(this.userData.secondPosition!=null){
            this.seleccionadoPosicion2[this.userData.secondPosition]=true;
          }
          this.formUser.patchValue({
            twitter: this.userData.twitter,
            position: this.userData.position,
            secondPosition: this.userData.secondPosition,
            platform: this.userData.platform
          })
        }
      );
  }

  cerrarSesion(): void{
    this.authService.LogOut();
    this.router.navigate(["/unete"]).then(() => {
      window.location.reload();
    });
  }

  guardar(): void{
    // console.log(this.formUser.get('twitter'));
    console.log(this.formUser.value)
    let cambioUser:any;
    this.tengoDatos=false;
    this.http.put(this.url+"usuarios/"+this.userData.idUser,this.formUser.value,this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      console.log(this.formUser.value.twitter);
      this.tengoDatos=true;
      this.userData=r
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Datos guardados exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      console.log(error);
      this.tengoDatos=true;
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    });
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
