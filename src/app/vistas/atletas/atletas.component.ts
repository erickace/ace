import { Component, OnDestroy, OnInit, Renderer2  } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service'

import { ListaUsuariosII, ListaUsuariosIII } from '../../modelos/listausuarios.interface';
import { ResponseI, ResponseII } from '../../modelos/response.interface';
import { InfoUser, InfoUserCaracterisitica } from '../../modelos/response.interface';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent implements OnDestroy, OnInit {

  title = 'datatables';
  iUser:InfoUser[] = [];
  iUserCaracteristica:InfoUserCaracterisitica[] = [];
  apellido:string = "";
  nombre:string = "";
  username:string = "";
  nombreDash:string = "";
  mes:string = "";
  anio:string = "";
  tipo:string = "";
  fecha_nac:string = "";
  id_usuario:number = 0;
  sexo:string = "";
  estatura:number = 0.0;
  peso:number = 0.0;
  edad:number = 0;
  direccion:string = "";
  telefono:number = 0;
  dtOptions: DataTables.Settings = {};
  conteo:string = "";

  DAteltas:ListaUsuariosIII[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private api:ApiService, private router:Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.updateCount();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ atletas",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ atletas",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        }
      }
    };

    this.api.getAllUsersForCouch().subscribe(data =>{
      this.DAteltas = data;
      console.log(this.DAteltas);
      this.dtTrigger.next();
    });
  }

  updateCount() {
    this.api.countCoachAtletas().subscribe(data =>{
      var JSONArray = JSON.parse(JSON.stringify(data)); 
      let dataResponse:ResponseI = JSONArray[0]; 
      let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
      this.conteo = dataResponseI.message;
    });
  }

  checkLocalStorage(){
    if(localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "1"){ // es couch
      this.router.navigate(['atletas']);
      this.onInfoPerfil();
    }else{
      this.router.navigate(['login']);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  } 

  spliFecha(dato:any):string {
    return dato.split("T", 1);
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      //console.log(event.target);
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      if (event.target.getAttribute("type") == "checkbox") {
        //alert(event.target.getAttribute("id"));
        var isChecked = (<HTMLInputElement>document.getElementById(event.target.getAttribute("id"))).checked;
        if(isChecked){
          const idCouch = localStorage.getItem('idCouch');
          const idAtleta = event.target.getAttribute("id"); 
          const objectVar = {
            id_couch: idCouch,
            id_atleta: idAtleta,
            tipo: "asignacion"
          };
          console.log(objectVar);
          this.api.assignAteltaforCouch(objectVar).subscribe(data =>{
            console.log(data);
            var JSONArray = JSON.parse(JSON.stringify(data)); 
            let dataResponse:ResponseI = JSONArray[0]; 
            let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
            if(dataResponseI.status == 'ok'){  
              Toast.fire({
                icon: 'success',
                title: dataResponseI.message
              });
              this.updateCount();
            } else {
              Toast.fire({
                icon: 'error',
                title: dataResponseI.message
              });
              this.updateCount();
            }
          });
        }else{
          const idCouch = localStorage.getItem('idCouch');
          const idAtleta = event.target.getAttribute("id"); 
          const objectVar = {
            id_couch: idCouch,
            id_atleta: idAtleta,
            tipo: "desasignacion"
          };
          console.log(objectVar);
          this.api.assignAteltaforCouch(objectVar).subscribe(data =>{
            var JSONArray = JSON.parse(JSON.stringify(data)); 
            let dataResponse:ResponseI = JSONArray[0]; 
            let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
            if(dataResponseI.status == 'ok'){  
              Toast.fire({
                icon: 'success',
                title: dataResponseI.message
              });
              this.updateCount();
            } else {
              Toast.fire({
                icon: 'error',
                title: dataResponseI.message
              });
              this.updateCount();
            }
          });
        }
      }
    });
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
    localStorage.removeItem('idAtleta');
    localStorage.removeItem('idCouch');
    this.router.navigate(['login']);
  }

  onContacto(){
    
  }

  onInfoPerfil() {
    const currentType = localStorage.getItem('es_entrenador');
    if(currentType == "1"){
      this.tipo = "Couch";
    }else if(currentType == "0"){
      this.tipo = "Atleta";
    }else{
      this.tipo = "";
    }

    this.api.infoByUser().subscribe(data =>{
      this.iUser = data;
      this.nombreDash = this.iUser[0].nombre.split(" ", 1) + " " +this.iUser[0].apellido.split(" ", 1);
      this.username = this.iUser[0].username;
      
      if(this.iUser[0].fecha_nac == null){
        this.fecha_nac = "";
      }else{
        this.fecha_nac = this.iUser[0].fecha_nac.split("T", 1)[0];
      }

      this.id_usuario = this.iUser[0].id_usuario;
      this.nombre = this.iUser[0].nombre;
      this.apellido = this.iUser[0].apellido;

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
      
      this.api.infoByUserCaracteristicas(this.id_usuario).subscribe(data =>{
        this.iUserCaracteristica = data;
        this.sexo = this.iUserCaracteristica[0].sexo;
        this.direccion = this.iUserCaracteristica[0].direccion;
        this.telefono = this.iUserCaracteristica[0].telefono;
        if(this.iUserCaracteristica[0].estatura == null){
          this.estatura = 0.0;
        } else {
          this.estatura = this.iUserCaracteristica[0].estatura;
        }

        if(this.iUserCaracteristica[0].peso == null){
          this.peso = 0.0;
        } else {
          this.peso = this.iUserCaracteristica[0].peso;
        }

        if(this.iUserCaracteristica[0].edad == null){
          this.edad = 0;
        } else {
          this.edad = this.iUserCaracteristica[0].edad;
        }
      });
    });
  }


}
