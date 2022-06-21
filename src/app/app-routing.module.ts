import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarequipoComponent } from './buscarequipo/buscarequipo.component';
import { BuscarjugadorComponent } from './buscarjugador/buscarjugador.component';
import { CanActivateGuard } from './can-activate.guard';
import { GuiaComponent } from './guia/guia.component';
import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistrologinComponent } from './registrologin/registrologin.component';


// RUTAS DE NAVEGACION
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [CanActivateGuard]},
  {path: 'unete', component: RegistrologinComponent},
  {path: 'buscarEquipo', component: BuscarequipoComponent, canActivate: [CanActivateGuard]},
  {path: 'buscarJugador', component: BuscarjugadorComponent, canActivate: [CanActivateGuard]},
  {path: 'notificaciones', component: NotificationsComponent, canActivate: [CanActivateGuard]},
  {path: 'guia', component: GuiaComponent},
  {path: '**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
