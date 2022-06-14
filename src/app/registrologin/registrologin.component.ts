import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogin } from '../models/ilogin';
import { IResponse } from '../models/iresponse';

@Component({
  selector: 'app-registrologin',
  templateUrl: './registrologin.component.html',
  styleUrls: ['./registrologin.component.css']
})
export class RegistrologinComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  formRegister: FormGroup;
  // subRef$: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    // private http: HttpClient,
    // private router: Router
  ) {
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
  }

  // Login(){
  //   const userLogin: ILogin = {
  //     username: this.formLogin.value.username,
  //     password: this.formLogin.value.password
  //   };

  //   this.subRef$ = this.http.post<IResponse>('http://localhost/apiComm/apiComm/public/api/auth/login',
  //   userLogin, { observe: 'response'})
  //   .subscribe(res => {
  //     const token=res.body.response;
  //     console.log('token',res.body.response);
  //     sessionStorage.setItem('token',token);
  //     this.router.navigate(['/home']);
  //   }, err => {console.log("Error en el login", err);});

  // }

  ngOnDestroy(): void {
    // if(this.subRef$){
    //   this.subRef$.unsubscribe();
    // }
  }
}
