import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../servicios/api/api.service'
import { InfoUser, ResponseDataRC } from '../../modelos/response.interface';
import { histo } from '../../modelos/listausuarios.interface';
import { ResponseI, ResponseII } from '../../modelos/response.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardcouch',
  templateUrl: './dashboardcouch.component.html',
  styleUrls: ['./dashboardcouch.component.css']
})
export class DashboardcouchComponent implements OnInit {
  
  histoUser:histo[] = [];
  iUser:InfoUser[] = [];
  apellido:string = "";
  nombre:string = "";
  username:string = "";
  nombreDash:string = "";
  mes:string = "";
  anio:string = "";
  idCouch:string = "";
  conteo:string = "";

  datos: ResponseDataRC[] = [];
  datos_: ResponseDataRC[] = [];
  datos__: ResponseDataRC[] = [];
  fecha: any = "";

  ultimaMedicioRC:any = "";
  ultimaMedicioRC_:any = "";
  ultimaMedicioRC__:any = "";
  fechaIzq:any = "";
  fechaDer:any = "";
  fechaIzq_:any = "";
  fechaDer_:any = "";
  fechaIzq__:any = "";
  fechaDer__:any = "";
  ultRC:any = "";
  ultTC:any = "";
  ultOS:any = "";
  primedioRC:any = "";
  primedioTC:any = "";
  primedioOS:any = "";
  primedioRCR:number = 0;
  contador: number = 0;

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.updateCount();
    this.siFunciona();
    //(<HTMLInputElement>document.getElementById("inputOSwid")).focus(); 
    
  }

  siFunciona() {
    var datoentero = 0;
    //this.enviaData();
   //this.enviaDataTC();
    //this.enviaDataOS();

    this.api.getHistorialGeneral(Number(localStorage.getItem('idCouch'))).subscribe(data => {
      this.histoUser = data;
      console.log(this.histoUser);
      //this.histoUser[0].valor
    });

    // pulso cardiaco
    const objectVar_ = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 2
    };
    datoentero = datoentero+1;
    this.api.rcGET(objectVar_).subscribe(data => {
      this.datos = data;
      if(this.datos.length > 0){
        //"2021-02-27T10:20:37.000Z"
        this.fechaIzq = this.datos[0].fecha.split("T", 1)[0];
        this.fechaDer = this.datos[0].fecha.split("T", 2)[1].split(".", 1)[0];
        this.ultimaMedicioRC = this.fechaIzq + " " + this.fechaDer;
        this.ultRC = this.datos[0].valor.toFixed(2);
        //(<HTMLInputElement>document.getElementById("inputRCwid")).focus(); 
        $('input').blur();
        if(this.contador < 2){
          this.api.promedio(objectVar_).subscribe(data => {
            var JSONArray = JSON.parse(JSON.stringify(data)); 
            let dataResponse:ResponseI = JSONArray[0]; 
            let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
            this.primedioRC = Number(dataResponseI.message).toFixed(2);
            console.log(this.primedioRC);
          });
        }
      }
    });
    //. pulso cardiaco

    // temperatura corporal
    const objectVar__ = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 3
    };
    this.api.rcGET(objectVar__).subscribe(data => {
      this.datos_ = data;
      if(this.datos_.length > 0){
        this.fechaIzq_ = this.datos_[0].fecha.split("T", 1)[0];
        this.fechaDer_ = this.datos_[0].fecha.split("T", 2)[1].split(".", 1)[0];
        this.ultimaMedicioRC_ = this.fechaIzq_ + " " + this.fechaDer_;
        this.ultTC = this.datos_[0].valor.toFixed(2);
        //(<HTMLInputElement>document.getElementById("inputTCwid")).focus(); 
        $('input').blur();
        if(this.contador < 2){
          this.api.promedio(objectVar__).subscribe(data => {
            var JSONArray = JSON.parse(JSON.stringify(data)); 
            let dataResponse:ResponseI = JSONArray[0]; 
            let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
            this.primedioTC = Number(dataResponseI.message).toFixed(2);
          });
        }
      }
    });
    //. temperatura corporal

    // oxigeno en la sangre
    const objectVar___ = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 1
    };
    this.api.rcGET(objectVar___).subscribe(data => {
      this.datos__ = data;
      if(this.datos__.length > 0){
        this.fechaIzq__ = this.datos__[0].fecha.split("T", 1)[0];
        this.fechaDer__ = this.datos__[0].fecha.split("T", 2)[1].split(".", 1)[0];
        this.ultimaMedicioRC__ = this.fechaIzq__ + " " + this.fechaDer__;
        this.ultOS = this.datos__[0].valor.toFixed(2);
        //(<HTMLInputElement>document.getElementById("inputOSwid")).focus(); 
        $('input').blur();
        if(this.contador < 2){
          this.api.promedio(objectVar___).subscribe(data => {
            var JSONArray = JSON.parse(JSON.stringify(data)); 
            let dataResponse:ResponseI = JSONArray[0]; 
            let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
            this.primedioOS = Number(dataResponseI.message).toFixed(2);
          });
        }
      }
    });
    //. oxigeno en la sangre
    this.contador += datoentero;
    if(this.contador == 10){
      this.contador = 0;
    }
    //console.log(this.contador);

    // fecha/crono/reinicio
    var d = new Date();
    this.fecha = d;
    setTimeout(() => {
      this.siFunciona()
    }, 1000);
    //. fecha/crono/reinicio
  }

  updateCount() {
    this.api.countCoachAtletas().subscribe(data =>{
      var JSONArray = JSON.parse(JSON.stringify(data)); 
      let dataResponse:ResponseI = JSONArray[0]; 
      let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
      this.conteo = dataResponseI.message;
    });
  }

  enviaData() {
    const objectVar = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 2,
      valor: Math.random() * (100 - 90) + 90
    };

    this.api.rc(objectVar).subscribe(data => {

    });
  }

  enviaDataTC() {
    const objectVar = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 3,
      valor: Math.random() * (40 - 30) + 30
    };

    this.api.rc(objectVar).subscribe(data => {

    });
  }

  enviaDataOS() {
    const objectVar = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 1,
      valor: Math.random() * (200 - 100) + 100
    };

    this.api.rc(objectVar).subscribe(data => {

    });
  }

  checkLocalStorage(){
    if(localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "0"){ // dashboard atleta
      this.router.navigate(['dashboard']);
    }else if(localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "1"){ // dashboard couch
      this.router.navigate(['dashboardcouch']);
      this.onInfoPerfil();
    }else{
      this.router.navigate(['login']);
    }
  }
  
  onDashboard(){
    this.router.navigate(['dashboardcouch']);
  }

  onMisAtletas(){
    this.router.navigate(['misatletas']);
  }

  onAtletas(){
    this.router.navigate(['atletas']);
  }

  onMiPerfil(){
    this.router.navigate(['miperfil']);
  }

  onCerrarSesion(){
    localStorage.removeItem('username');
    localStorage.removeItem('es_entrenador');
    this.router.navigate(['login']);
  }

  onContacto(){
    
  }

  onRCRitmo(){
    this.router.navigate(['ritmocouch']);
  }

  onTCTemperatura(){
    this.router.navigate(['temperaturacouch']);
  }

  onOCOxigeno(){
    this.router.navigate(['oxigenocouch']);
  }

  onInfoPerfil() {
    this.api.infoByUser().subscribe(data =>{
      this.iUser = data;
      this.nombreDash = this.iUser[0].nombre.split(" ", 1) + " " +this.iUser[0].apellido.split(" ", 1);
      this.username = this.iUser[0].username;
      this.idCouch = this.iUser[0].id_usuario;
      localStorage.setItem("idCouch",this.idCouch);

      //2021-02-16T01:52:21.000Z
      this.anio = this.iUser[0].fecha_creacion.split("-", 2)[0];
      if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "01"){
        this.mes = "Ene.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "02"){
        this.mes = "Feb.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "03"){
        this.mes = "Mar.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "04"){
        this.mes = "Abr.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "05"){
        this.mes = "May.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "06"){
        this.mes = "Jun.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "07"){
        this.mes = "Jul.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "08"){
        this.mes = "Ago.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "09"){
        this.mes = "Sep.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "10"){
        this.mes = "Oct.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "11"){
        this.mes = "Nov.";
      }else if(this.iUser[0].fecha_creacion.split("-", 2)[1] == "12"){
        this.mes = "Dic.";
      }else{
        this.mes = "Feb.";
      }

    });
  }

}
