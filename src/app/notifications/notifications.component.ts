import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.cookieService.get("key")
  })
  requestOptions = {headers: this.headers};
  url: string;
  notificaciones:any;
  hayDatos:boolean=false;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.url = environment.urlBase;
   }

  ngOnInit(): void {
    this.http.get(this.url+"notifications", this.requestOptions)
    .subscribe(
      resultado => {
        this.hayDatos=true;
        console.log(resultado);
        this.notificaciones=resultado;
      }
    );
  }

  aceptar(id:number):void {
    console.log(id);
    // /notifications/accept/{id}
    this.hayDatos=false;
    this.http.post(this.url+"notifications/accept/"+id,{},this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      // console.log(this.formPostulacion.value.twitter);
      this.hayDatos=true;
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Notificación aceptada',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      console.log(error);
      this.hayDatos=true;
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });
  }
  
  denegar(id:number):void {
    this.hayDatos=false;
    this.http.post(this.url+"notifications/decline/"+id,{},this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      // console.log(this.formPostulacion.value.twitter);
      this.hayDatos=true;
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Notificación borrada',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      console.log(error);
      this.hayDatos=true;
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
