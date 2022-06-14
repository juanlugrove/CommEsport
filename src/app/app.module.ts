import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AlertComponent } from './alert/alert.component';
import { UserDataComponent } from './user-data/user-data.component';
import { HomeComponent } from './home/home.component';
import { RegistrologinComponent } from './registrologin/registrologin.component';
import { BuscarequipoComponent } from './buscarequipo/buscarequipo.component';
import { BuscarjugadorComponent } from './buscarjugador/buscarjugador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GuiaComponent } from './guia/guia.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AlertComponent,
    UserDataComponent,
    HomeComponent,
    RegistrologinComponent,
    BuscarequipoComponent,
    BuscarjugadorComponent,
    PerfilComponent,
    PagenotfoundComponent,
    FooterComponent,
    GuiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
