import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../servicios/api/api.service'
import { InfoUser, InfoUserCaracterisitica, ResponseI, ResponseII } from '../../modelos/response.interface';



import { Router } from '@angular/router';

import Swal from 'sweetalert2';

//import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

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
  conteo:string = "";


  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.onInfoPerfil();
    this.checkLocalStorage();
    this.updateCount();
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
    if(localStorage.getItem('username') != null){
      this.router.navigate(['miperfil']);
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
    localStorage.removeItem('idAtleta');
    localStorage.removeItem('idCouch');
    this.router.navigate(['login']);
  }

  onContacto(){
    
  }

  onEditar(){
    var estado = 0; 
    const nombreU = (<HTMLInputElement>document.getElementById("editNombre")).value;
    const apellidoU = (<HTMLInputElement>document.getElementById("editApellido")).value;
    const fechaU = (<HTMLInputElement>document.getElementById("editFecha")).value;
    const sexoU = (<HTMLInputElement>document.getElementById("editSexo")).value;
    const direccionU = (<HTMLInputElement>document.getElementById("editDireccion")).value;
    const telefonoU = (<HTMLInputElement>document.getElementById("editTelefono")).value;
    const pesoU = (<HTMLInputElement>document.getElementById("editPeso")).value;
    const edadU = (<HTMLInputElement>document.getElementById("editEdad")).value;
    const estaturaU = (<HTMLInputElement>document.getElementById("editEstatura")).value;

    const nombreU_ = document.querySelector('#editNombre');
    const apellidoU_ = document.querySelector('#editApellido');
    const fechaU_ = document.querySelector('#editFecha');
    const sexoU_ = document.querySelector('#editSexo');
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    if(nombreU == ""){
      nombreU_?.classList.add('is-invalid');
      estado = 1;
    }else{
      nombreU_?.classList.remove("is-invalid");
    }
    if(apellidoU == ""){
      apellidoU_?.classList.add('is-invalid');
      estado = 1;
    }else{
      apellidoU_?.classList.remove("is-invalid");
    }
    if(fechaU == ""){
      fechaU_?.classList.add('is-invalid');
      estado = 1;
    }else{
      fechaU_?.classList.remove("is-invalid");
    }
    if(sexoU == ""){
      sexoU_?.classList.add('is-invalid');
      estado = 1;
    }else{
      sexoU_?.classList.remove("is-invalid");
    }

    if(nombreU == ""||apellidoU == ""||fechaU == ""||sexoU == ""){
      Toast.fire({
        icon: 'warning',
        title: 'Campos o campo vacio. Por favor colocar datos donde se le solicita.'
      });
    }

    if(estado == 0) {
      const objectVar = {
        id_usuario: this.id_usuario,
        nombre: nombreU,
        apellido: apellidoU,
        fecha_nac: fechaU,
        edad: edadU,
        sexo: sexoU,
        peso: pesoU,
        estatura: estaturaU,
        direccion: direccionU,
        telefono: telefonoU
      };

      this.api.editUserProfile(objectVar).subscribe(data =>{
        console.log(data);
        var JSONArray = JSON.parse(JSON.stringify(data)); 
        let dataResponse:ResponseI = JSONArray[0]; 
        let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
        if(dataResponseI.status == 'ok '){  
          Toast.fire({
            icon: 'success',
            title: dataResponseI.message
          });
        } else {
          Toast.fire({
            icon: 'warning',
            title: dataResponseI.message
          });
        }
        this.onInfoPerfil();
      });
    }
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
      //console.log(this.id_usuario);
      this.api.infoByUserCaracteristicas(this.id_usuario).subscribe(data =>{
        //console.log(data);
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
