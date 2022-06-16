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

@Component({
  selector: 'app-registrologin',
  templateUrl: './registrologin.component.html',
  styleUrls: ['./registrologin.component.css']
})
export class RegistrologinComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  formRegister: FormGroup;
  loading: boolean=false;
  url: string;
  // subRef$: Subscription;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private AuthService: AuthService, private router: Router) {
    this.url = environment.urlBase;
    this.formLogin=formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRegister=formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', Validators.required],
      platform: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    // this.http.get()
  }

  Login(){
    let infoLogin:any;
    this.loading=true
    this.http.post(this.url+"auth/login",this.formLogin.value).pipe(catchError(this.errorHandler)).subscribe( r => {
      // console.log(r);
      this.loading=false;
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
      this.loading=false;
      Swal.fire({
        title: 'Vaya',
        text: 'Usuario o contraseña incorrectas',
        icon: 'error',
        confirmButtonText: 'Cool'
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
}
