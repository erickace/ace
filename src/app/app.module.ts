import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { routingComponents }  from './app-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { DashboardcouchComponent } from './vistas/dashboardcouch/dashboardcouch.component';
import { MiperfilComponent } from './vistas/miperfil/miperfil.component';
import { AtletasComponent } from './vistas/atletas/atletas.component';
import { MisatletasComponent } from './vistas/misatletas/misatletas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { RcatletacouchComponent } from './vistas/rcatletacouch/rcatletacouch.component';
import { TcatletacouchComponent } from './vistas/tcatletacouch/tcatletacouch.component';
import { OsatletacouchComponent } from './vistas/osatletacouch/osatletacouch.component';
import { DashatletacouchComponent } from './vistas/dashatletacouch/dashatletacouch.component';
import { RitmocouchComponent } from './vistas/ritmocouch/ritmocouch.component';
import { TemperaturacouchComponent } from './vistas/temperaturacouch/temperaturacouch.component';
import { OxigenocouchComponent } from './vistas/oxigenocouch/oxigenocouch.component';
import { RcComponent } from './vistas/rc/rc.component';
import { TcComponent } from './vistas/tc/tc.component';
import { OsComponent } from './vistas/os/os.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    DashboardcouchComponent,
    MiperfilComponent,
    AtletasComponent,
    MisatletasComponent,
    RcatletacouchComponent,
    TcatletacouchComponent,
    OsatletacouchComponent,
    DashatletacouchComponent,
    RitmocouchComponent,
    TemperaturacouchComponent,
    OxigenocouchComponent,
    RcComponent,
    TcComponent,
    OsComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
