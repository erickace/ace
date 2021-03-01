import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service'
import { ListaUsuariosII, ListaUsuariosIII, infoAtleta, enviarDataRC } from '../../modelos/listausuarios.interface';
import { ResponseI, ResponseII, ResponseDataRC, TempMinMax } from '../../modelos/response.interface';
import { InfoUser, InfoUserCaracterisitica } from '../../modelos/response.interface';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./tc.component.css']
})
export class TcComponent implements OnInit {

  minMaxTemp: TempMinMax[] = [];
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
  histoUser: ResponseDataRC[] = [];
  contador: number = 0;
  comon: number = 0;
  fecha: any = "";
  valoractual: any = "";
  primedioTC: any = "";
  minimo: any = "";
  maximo: any = "";
  contador2: number = 0;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.config.data.labels.pop();
    this.config.data.datasets.forEach(function (dataset: any) {
      dataset.data.pop();
    });
    const currentIdAtleta = Number(localStorage.getItem('idAtleta'));
    this.onDarInfo(currentIdAtleta);
    this.checkLocalStorage();
    this.siFunciona();
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


  config: any = {
    type: 'line',
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      datasets: [{
        label: '',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)'
        ],
        data: [

        ],
        fill: true,
      }]
    },
    options: {
      animation: {
        duration: 15,
        easing: 'easeInQuad'
      },
      responsive: true,
      title: {
        display: true,
        text: 'Temperatura corporal'
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
            labelString: 'Grados Farenheit'
          }
        }]
      }
    }
  };

  config1: any = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Temperatura corporal',
        backgroundColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        data: [

        ]
      }]
    },
    options: {
      animation: {
        duration: 15,
        easing: 'easeInQuad'
      },
      responsive: true,
      title: {
        display: true,
        text: 'Temperatura corporal'
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
          stacked: true,
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Fecha'
          }
        }],
        yAxes: [{
          stacked: true,
          display: true,
          scaleLabel: {
            display: true,
            labelString: '°C'
          }
        }]
      }
    }
  };

  enviaData() {
    const objectVar = {
      id_usuario: localStorage.getItem('idAtleta'),
      id_medicion: 3,
      valor: Math.random() * (100 - 90) + 90
    };
    this.api.rc(objectVar).subscribe(data => {
    });
  }

  siFunciona() {
    var datoentero = 0;
    //this.enviaData();
    const objectVar_ = {
      id_usuario: localStorage.getItem('idAtleta'),
      id_medicion: 3
    };

    if (this.contador2 < 2) {
      var myLineChart1 = new Chart('graficaHistorial', this.config1);
      this.api.historialUnico(objectVar_).subscribe(data => {
        this.histoUser = data;
        var fechas: any = [];
        var valores: any = [];
        var colores: any = [];
        var temperaturacorporal: number = 1;
        for (var i = 0; i < this.histoUser.length; i++) {
          //console.log(this.histo[i].fecha.split('T',1)[0] + " " + this.histo[i].fecha.split('T',2)[1].split('.',1)[0]);
          fechas.push(this.histoUser[i].fecha.split('T', 1)[0] + " " + this.histoUser[i].fecha.split('T', 2)[1].split('.', 1)[0]);
          valores.push(this.histoUser[i].valor);
          colores.push();
          if (temperaturacorporal == 25) {
            break;
          }
          temperaturacorporal++;
        }
        if (this.config1.data.datasets.length > 0) {
          this.config1.data.labels.pop();
          this.config1.data.datasets.forEach(function (dataset: any) {
            dataset.data.pop();
          });
          myLineChart1.update();
          this.config1.data.backgroundColor = colores;
          this.config1.data.labels = fechas; // labels de la grafica
          this.config1.data.datasets.forEach(function (dataset: any) {
            dataset.data = valores; // temperatura corporal
          });
          myLineChart1.update();
        }
      });
    }


    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };
    var myLineChart = new Chart('canvas', this.config);
    myLineChart.update();
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
        if (this.contador > 59) {
          this.config.data.labels.push(this.contador);
        }
        this.config.data.datasets.forEach(function (dataset: any) {
          datoentero = datoentero + 1;
          dataset.data.push(ultimoValor);
        });
        myLineChart.update();
      }
      if (this.contador2 < 2) {
        this.api.promedio(objectVar_).subscribe(data => {
          var JSONArray = JSON.parse(JSON.stringify(data));
          let dataResponse: ResponseI = JSONArray[0];
          let dataResponseI: ResponseII = JSON.parse(dataResponse.consulta);
          this.primedioTC = Number(dataResponseI.message).toFixed(2);
          this.api.minmax(Number(localStorage.getItem('idAtleta'))).subscribe(data => {
            this.minMaxTemp = data;
            this.minimo = this.minMaxTemp[0].MINIMO;
            this.maximo = this.minMaxTemp[0].MAXIMO;
          });
        });
      }
      this.contador += datoentero;
      this.contador2 += datoentero;
    });

    //console.log(this.contador);
    if (this.contador > 59) {
      this.config.data.labels.shift();
      this.config.data.datasets.forEach(function (dataset: any) {
        dataset.data.shift();
      });
      myLineChart.update();
    }

    if (this.contador2 == 10) {
      this.contador2 = 0;
    }

    var d = new Date();
    this.fecha = d;
    setTimeout(() => {
      this.siFunciona()
    }, 1000);
  }

  checkLocalStorage() {
    if (localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "0") { // dashboard atleta
      this.router.navigate(['tc']);
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

  onContacto() {

  }
  
  onMiPerfil() {
    this.router.navigate(['perfil']);
  }

  onCerrarSesion() {
    localStorage.removeItem('idAtleta');
    localStorage.removeItem('es_entrenador');
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }

  onDashboard() {
    this.router.navigate(['dashboard']);
  }

  onRitmoCardiaco(){
    this.router.navigate(['rc']);
  }

  onTemperaturaCorporal(){
    this.router.navigate(['tc']);
  }

  onOsigenoSangre(){
    this.router.navigate(['os']);
  }

}
