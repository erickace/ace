import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { DashboardcouchComponent } from './vistas/dashboardcouch/dashboardcouch.component';
import { MiperfilComponent } from './vistas/miperfil/miperfil.component';
import { AtletasComponent } from './vistas/atletas/atletas.component';
import { MisatletasComponent } from './vistas/misatletas/misatletas.component';
import { RcatletacouchComponent } from './vistas/rcatletacouch/rcatletacouch.component';
import { TcatletacouchComponent } from './vistas/tcatletacouch/tcatletacouch.component';
import { OsatletacouchComponent } from './vistas/osatletacouch/osatletacouch.component';
import { DashatletacouchComponent } from './vistas/dashatletacouch/dashatletacouch.component';
import { RitmocouchComponent } from './vistas/ritmocouch/ritmocouch.component';
import { TemperaturacouchComponent } from './vistas/temperaturacouch/temperaturacouch.component';
import { OxigenocouchComponent } from './vistas/oxigenocouch/oxigenocouch.component'

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'dashboardcouch', component:DashboardcouchComponent },
  { path:'miperfil', component:MiperfilComponent },
  { path:'atletas', component:AtletasComponent },
  { path:'misatletas', component:MisatletasComponent },
  { path:'rcatletacouch', component:RcatletacouchComponent },
  { path:'tcatletacouch', component:TcatletacouchComponent },
  { path:'osatletacouch', component:OsatletacouchComponent },
  { path:'dashatletacouch', component:DashatletacouchComponent },
  { path:'ritmocouch', component:RitmocouchComponent },
  { path:'temperaturacouch', component:TemperaturacouchComponent },
  { path:'oxigenocouch', component:OxigenocouchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,DashboardComponent,DashboardcouchComponent,MiperfilComponent,AtletasComponent,MisatletasComponent,RcatletacouchComponent,TcatletacouchComponent,OsatletacouchComponent,DashatletacouchComponent,RitmocouchComponent,TemperaturacouchComponent,OxigenocouchComponent]
