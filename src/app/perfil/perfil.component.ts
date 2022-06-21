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
  formTeam: FormGroup;
  formTeamNuevo: FormGroup;
  url: string;
  userData: any;
  teamData: any;
  tengoDatos: boolean = false;
  tengoDatosEquipo: boolean = false;
  seleccionadoPlatform=[false,false,false];
  seleccionadoPosicion=[false,false,false,false];
  seleccionadoPosicion2=[false,false,false,false];
  esCapitan:boolean=false;
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
    this.formTeam=formBuilder.group({
      name: ['', Validators.required],
      teamLogo: ['', Validators.required],
      twitter: [''],
    });
    this.formTeamNuevo=formBuilder.group({
      name: ['', Validators.required],
      teamLogo: [''],
      twitter: [''],
    });
   }

  ngOnInit(): void {
    this.http.get(this.url+"usuarios", this.requestOptions)
      .subscribe(
        resultado => {
          // console.log(resultado);
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

      this.http.get(this.url+"team", this.requestOptions)
      .subscribe(
        resultado2 => {
          console.log(resultado2);
          this.tengoDatosEquipo=true;
          this.teamData=resultado2;
          console.log(this.teamData);
          if(this.userData.idUser==this.teamData.captain){
            this.esCapitan=true;
          }
          if(resultado2){
            this.formTeam.patchValue({
              twitter: this.teamData.twitter,
              name: this.teamData.name,
              teamLogo: this.teamData.teamLogo
            })

          }
          // this.formUser.patchValue({
          //   twitter: this.userData.twitter,
          //   position: this.userData.position,
          //   secondPosition: this.userData.secondPosition,
          //   platform: this.userData.platform
          // })
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
    // console.log(this.formUser.value)
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
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

  salir():void {
    this.tengoDatosEquipo=false;
      this.http.delete(this.url+"teamUsers",this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
        this.tengoDatosEquipo=true;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Has salido del equipo',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }, error => {
        console.log(error);
        this.tengoDatosEquipo=true;
        Swal.fire({
          title: 'Error',
          text: 'Si eres el capitán, tienes que echar antes a tus jugadores',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#d9534f'
        })
      });
  }

  editarEquipo():void {
    this.tengoDatosEquipo=false;
    this.http.put(this.url+"team/"+this.teamData.idTeam,this.formTeam.value,this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      this.tengoDatosEquipo=true;
      this.teamData=r
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Equipo editado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      console.log(error);
      this.tengoDatosEquipo=true;
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });
    // console.log(this.formTeam.value);
  }

  crearEquipo():void {
    this.tengoDatosEquipo=false;
    // console.log(this.formTeamNuevo.value);
    this.http.post(this.url+"team",this.formTeamNuevo.value,this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
      // console.log(r);
      this.tengoDatosEquipo=true;
      this.teamData=r;
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Equipo creado exitosamente',
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
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d9534f'
      })
    });
  }

  echar(id:number):void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Echarás a este jugador de tu equipo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      this.tengoDatosEquipo=false;
      this.http.delete(this.url+"teamUsers/"+id,this.requestOptions).pipe(catchError(this.errorHandler)).subscribe( r => {
        this.tengoDatosEquipo=true;
        console.log(r);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Jugador eliminado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }, error => {
        console.log(error);
        this.tengoDatosEquipo=true;
        Swal.fire({
          title: 'Error',
          text: 'Vaya, ha ocurrido un error',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#d9534f'
        })
      });
    })
  }
}
