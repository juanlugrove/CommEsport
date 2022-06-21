import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-buscarjugador',
  templateUrl: './buscarjugador.component.html',
  styleUrls: ['./buscarjugador.component.css']
})
export class BuscarjugadorComponent implements OnInit {
  formPostulacion: FormGroup;
  url: string;
  cargando:boolean=false;
  tengoDatos: boolean=false;
  postulaciones:any;
  postulacionesPag:number=1;
  cargandoBorrar:boolean=false;
  username:string=this.cookieService.get("username")
  headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.cookieService.get("key")
  })
  requestOptions = {headers: this.headers};
  nombresEquipos:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cookieService: CookieService) {
    this.url = environment.urlBase;
    this.formPostulacion=formBuilder.group({
      description: ['', Validators.required],
      position: ['0', Validators.required]
    });
   }

  ngOnInit(): void {
    this.http.get(this.url+"userST", this.requestOptions)
      .subscribe(
        resultado => {
          this.tengoDatos=true;
          this.postulaciones=resultado;
          this.postulaciones.paginator;
        }
      );
  }

  paginate = (array:any, pageSize:number, pageNumber:number) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  siguiente():void {
    this.postulacionesPag++;
  }
  
  atras():void {
    this.postulacionesPag--;
  }

  guardar():void {
    this.cargando=true;
    this.http.post(this.url+"teamSU",this.formPostulacion.value,this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      console.log(this.formPostulacion.value.twitter);
      this.cargando=false;
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Postulacion creada',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      console.log(error);
      this.cargando=false;
      Swal.fire({
        title: 'Error',
        text: 'Debes ser el capitan de un equipo y no puedes tener más de 5 postulaciones en vigor',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

  borrar():void {
    this.cargandoBorrar=true;
    this.http.delete(this.url+"userST",this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      // console.log(this.formPostulacion.value.twitter);
      this.cargandoBorrar=false;
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Postulacion borrada',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      console.log(error);
      this.cargandoBorrar=false;
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Cool',
        confirmButtonColor: '#5cb85c'
      })
    });
  }

  fichar(idJugador:number, idPostulacion:number):void{
    this.tengoDatos=false;
    console.log(idJugador);
    console.log(idPostulacion);
    this.http.post(this.url+"notifications",{idUser:idJugador,type:"team",idPostulacion:idPostulacion},this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      // console.log(this.formPostulacion.value.twitter);
      this.tengoDatos=true;
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Postulacion creada',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      // console.log(error);
      this.tengoDatos=true;
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });
  }
}
