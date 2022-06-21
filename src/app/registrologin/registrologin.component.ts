import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../models/ilogin';
import { IResponse } from '../models/iresponse';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { ValidacionesPropias } from '../validaciones-propias';


@Component({
  selector: 'app-registrologin',
  templateUrl: './registrologin.component.html',
  styleUrls: ['./registrologin.component.css']
})
export class RegistrologinComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  formRegister: FormGroup;
  loadingLogin: boolean=false;
  loadingRegistro: boolean=false;
  url: string;
  usuarioUsado:boolean=false;
  correoUsado:boolean=false;
  mostrarErrores:boolean=false;
  // subRef$: Subscription;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private AuthService: AuthService, private router: Router) {
    this.url = environment.urlBase;
    this.formLogin=formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRegister=formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required ,Validators.minLength(6)]],
      mail: ['', [Validators.required,Validators.email]],
      platform: ['5', [Validators.required, ValidacionesPropias.plataformaSeleccionada]],
      position: ['5', [Validators.required, ValidacionesPropias.plataformaSeleccionada]]
    });
   }

  ngOnInit(): void {
    // this.http.get()
  }

  Login(){
    let infoLogin:any;
    this.loadingLogin=true
    this.http.post(this.url+"auth/login",this.formLogin.value).pipe(catchError(this.errorHandler)).subscribe( r => {
      // console.log(r);
      this.loadingLogin=false;
      infoLogin=r
      this.AuthService.Login(this.formLogin.value.username,infoLogin.access_token);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(["/home"]).then(() => {
        window.location.reload();
      });
    }, error => {
      console.log(error);
      this.loadingLogin=false;
      Swal.fire({
        title: 'Vaya',
        text: 'Usuario o contraseña incorrectas',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });

  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

  ngOnDestroy(): void {
    // if(this.subRef$){
    //   this.subRef$.unsubscribe();
    // }
  }

  register():void {
    if(this.formRegister.valid && !this.correoUsado && !this.usuarioUsado){
      this.loadingRegistro=true;
      this.http.get(this.url+"auth/username/"+this.formRegister.value.username).subscribe( r => {
        if(r==false){
          this.usuarioUsado=false;
          this.http.get(this.url+"auth/mail/"+this.formRegister.value.mail).subscribe( r => {
            if(r==false){
              this.correoUsado=false;
              
              this.http.post(this.url+"auth/register",this.formRegister.value).pipe(catchError(this.errorHandler)).subscribe( r => {
                // console.log(r);
                this.loadingRegistro=false;
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Usuario registrado',
                  showConfirmButton: false,
                  timer: 1500
                })
                  window.location.reload();
              }, error => {
                console.log(error);
                this.loadingRegistro=false;
                Swal.fire({
                  title: 'Vaya',
                  text: 'Intentelo de nuevo por favor',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#d9534f'
                })
              });

            } else {
              this.correoUsado=true;
              this.loadingRegistro=false;

            }
          });
        } else {
          this.loadingRegistro=false;
          this.usuarioUsado=true;
        }
      });
    }else {
      this.mostrarErrores=true;
    }
  }
}
