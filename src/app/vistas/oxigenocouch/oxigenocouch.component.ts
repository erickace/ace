import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service'
import { ListaUsuariosII, ListaUsuariosIII, infoAtleta, enviarDataRC } from '../../modelos/listausuarios.interface';
import { ResponseI, ResponseII, ResponseDataRC } from '../../modelos/response.interface';
import { InfoUser, InfoUserCaracterisitica } from '../../modelos/response.interface';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-oxigenocouch',
  templateUrl: './oxigenocouch.component.html',
  styleUrls: ['./oxigenocouch.component.css']
})
export class OxigenocouchComponent implements OnInit {

  iUser: InfoUser[] = [];
  iAtleta: infoAtleta[] = [];
  iUserCaracteristica: InfoUserCaracterisitica[] = [];
  apellido: string = "";
  nombre: string = "";
  username: string = "";
  nombreDash: string = "";
  mes: string = "";
  anio: string = "";
  tipo: string = "";
  fecha_nac: string = "";
  id_usuario: number = 0;
  sexo: string = "";
  estatura: number = 0.0;
  peso: number = 0.0;
  edad: number = 0;
  direccion: string = "";
  telefono: number = 0;
  dtOptions: DataTables.Settings = {};
  conteo: string = "";
  d: number = 0;
  datos: ResponseDataRC[] = [];
  contador: number = 1;
  comon: number = 0;
  fecha: any = "";

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    const currentIdAtleta = Number(localStorage.getItem('idCouch'));
    this.onDarInfo(currentIdAtleta);
    this.checkLocalStorage();
    this.siFunciona();
  }

  config: any = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '',
        backgroundColor: [
          'rgba(79, 102, 88, 0.15)',
          'rgba(79, 102, 88, 0.15)',
          'rgba(79, 102, 88, 0.15)',
          'rgba(79, 102, 88, 0.15)',
          'rgba(79, 102, 88, 0.15)',
          'rgba(79, 102, 88, 0.15)'
        ],
        borderColor: [
          'rgba(79, 102, 88, 0.15)'
        ],
        data: [

        ],
        fill: true,
        pointRadius: 10,
        pointHoverRadius: 15,
        borderDash: [5, 5]
      }]
    },
    options: {
      animation: {
        duration: 15
      },
      responsive: true,
      title: {
        display: true,
        text: 'Oxigeno en la Sangre'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Segundos'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'SpO2'
          }
        }]
      }
    }
  };

  enviaData() {
    const objectVar = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 1,
      valor: Math.random() * (100 - 90) + 90
    };
    this.api.rc(objectVar).subscribe(data => {
    });
  }

  siFunciona() {
    var datoentero = 0;
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };
    var myLineChart = new Chart('canvas', this.config);

    //this.enviaData();

    const objectVar_ = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 1
    };

    let miarray: number[] = [];
    var data1: any[] = [];
    var data_: number[] = [];
    var name: any = [];
    var marks: any = [];
    var ultimoValor: any = 0;
    this.api.rcGET(objectVar_).subscribe(data => {
      this.datos = data;
      this.comon = this.datos[0].valor;;
      ultimoValor = this.datos[0].valor;;
      const container = document.querySelector(".container");
      if (this.config.data.datasets.length > 0) {
        var month = MONTHS[this.config.data.labels.length % MONTHS.length];
        //if (this.contador > 59) {
          this.config.data.labels.push(this.contador);
        //}
        this.config.data.datasets.forEach(function (dataset: any) {
          datoentero = datoentero + 1;
          dataset.data.push(ultimoValor);
        });
        myLineChart.update();
      }
      this.contador += datoentero;
    });

    //console.log(this.contador);
    if (this.contador > 59) {
      this.config.data.labels.shift();
      this.config.data.datasets.forEach(function (dataset: any) {
        dataset.data.shift();
      });
      myLineChart.update();
    }
    var d = new Date();
    this.fecha = d;
    setTimeout(() => {
      this.siFunciona()
    }, 1000);
  }

  checkLocalStorage() {
    if (localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "1") { // es couch
      this.router.navigate(['oxigenocouch']);
      this.onInfoPerfil();
    } else {
      this.router.navigate(['login']);
    }
  }

  onInfoPerfil() {
    const currentType = localStorage.getItem('es_entrenador');
    if (currentType == "1") {
      this.tipo = "Couch";
    } else if (currentType == "0") {
      this.tipo = "Atleta";
    } else {
      this.tipo = "";
    }

    this.api.infoByUser().subscribe(data => {
      this.iUser = data;
      this.nombreDash = this.iUser[0].nombre.split(" ", 1) + " " + this.iUser[0].apellido.split(" ", 1);
      this.username = this.iUser[0].username;

      if (this.iUser[0].fecha_nac == null) {
        this.fecha_nac = "";
      } else {
        this.fecha_nac = this.iUser[0].fecha_nac.split("T", 1)[0];
      }

      this.id_usuario = this.iUser[0].id_usuario;
      this.nombre = this.iUser[0].nombre;
      this.apellido = this.iUser[0].apellido;

      //2021-02-16T01:52:21.000Z
      this.anio = this.iUser[0].fecha_creacion.split("-", 2)[0];
      if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "01") {
        this.mes = "Ene.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "02") {
        this.mes = "Feb.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "03") {
        this.mes = "Mar.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "04") {
        this.mes = "Abr.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "05") {
        this.mes = "May.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "06") {
        this.mes = "Jun.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "07") {
        this.mes = "Jul.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "08") {
        this.mes = "Ago.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "09") {
        this.mes = "Sep.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "10") {
        this.mes = "Oct.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "11") {
        this.mes = "Nov.";
      } else if (this.iUser[0].fecha_creacion.split("-", 2)[1] == "12") {
        this.mes = "Dic.";
      } else {
        this.mes = "Feb.";
      }

      this.api.infoByUserCaracteristicas(this.id_usuario).subscribe(data => {
        this.iUserCaracteristica = data;
        this.sexo = this.iUserCaracteristica[0].sexo;
        this.direccion = this.iUserCaracteristica[0].direccion;
        this.telefono = this.iUserCaracteristica[0].telefono;
        if (this.iUserCaracteristica[0].estatura == null) {
          this.estatura = 0.0;
        } else {
          this.estatura = this.iUserCaracteristica[0].estatura;
        }

        if (this.iUserCaracteristica[0].peso == null) {
          this.peso = 0.0;
        } else {
          this.peso = this.iUserCaracteristica[0].peso;
        }

        if (this.iUserCaracteristica[0].edad == null) {
          this.edad = 0;
        } else {
          this.edad = this.iUserCaracteristica[0].edad;
        }
      });
    });
  }

  // traigo la info del atleta al cual el couch revisa
  nombreUA: string = "";
  usernameUA: string = "";
  fecha_nacUA: string = "";
  edadUA: string = "";
  pesoUA: string = "";
  estaturaUA: string = "";
  sexoUA: string = "";
  direccionUA: string = "";
  telefonoUA: string = "";
  inscripcion: string = "";

  onDarInfo(id: number) {
    this.api.getAllInfoUser(id).subscribe(data => {
      this.iAtleta = data;
      this.nombreUA = this.iAtleta[0].nombre.split(" ", 1) + " " + this.iAtleta[0].apellido.split(" ", 1);
      this.usernameUA = this.iAtleta[0].username;
      if (this.iAtleta[0].fecha_nac == null) {
        this.fecha_nacUA = "";
      } else {
        this.fecha_nacUA = this.iAtleta[0].fecha_nac.split("T", 1)[0];
      }
      this.edadUA = this.iAtleta[0].edad;
      this.pesoUA = this.iAtleta[0].peso;
      this.estaturaUA = this.iAtleta[0].estatura;
      this.sexoUA = this.iAtleta[0].sexo;
      this.direccionUA = this.iAtleta[0].direccion;
      this.telefonoUA = this.iAtleta[0].telefono;
      if (this.iAtleta[0].fecha_creacion == null) {
        this.inscripcion = "";
      } else {
        this.inscripcion = this.iAtleta[0].fecha_creacion.split("T", 1)[0];
      }
    });
  }

  //traslados de paginas
  onDashboard() {
    this.router.navigate(['dashboardcouch']);
  }

  onMisAtletas() {
    this.router.navigate(['misatletas']);
  }

  onAtletas() {
    this.router.navigate(['atletas']);
  }

  onMiPerfil() {
    this.router.navigate(['miperfil']);
  }

  onCerrarSesion() {
    localStorage.removeItem('username');
    localStorage.removeItem('es_entrenador');
    this.router.navigate(['login']);
  }

  onContacto() {

  }

}
