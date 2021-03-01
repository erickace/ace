import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../servicios/api/api.service'
import { InfoUser, ResponseDataRC } from '../../modelos/response.interface';
import { histo } from '../../modelos/listausuarios.interface';
import { ResponseI, ResponseII } from '../../modelos/response.interface';

import { Router } from '@angular/router';
import { holdReady } from 'jquery';
import { Chart } from 'chart.js';
declare var google: any;

@Component({
  selector: 'app-dashboardcouch',
  templateUrl: './dashboardcouch.component.html',
  styleUrls: ['./dashboardcouch.component.css']
})
export class DashboardcouchComponent implements OnInit {

  histoUser: histo[] = [];
  iUser: InfoUser[] = [];
  apellido: string = "";
  nombre: string = "";
  username: string = "";
  nombreDash: string = "";
  mes: string = "";
  anio: string = "";
  idCouch: string = "";
  conteo: string = "";

  datos: ResponseDataRC[] = [];
  datos_: ResponseDataRC[] = [];
  datos__: ResponseDataRC[] = [];
  fecha: any = "";

  ultimaMedicioRC: any = "";
  ultimaMedicioRC_: any = "";
  ultimaMedicioRC__: any = "";
  fechaIzq: any = "";
  fechaDer: any = "";
  fechaIzq_: any = "";
  fechaDer_: any = "";
  fechaIzq__: any = "";
  fechaDer__: any = "";
  ultRC: any = "";
  ultTC: any = "";
  ultOS: any = "";
  primedioRC: any = "";
  primedioTC: any = "";
  primedioOS: any = "";
  primedioRCR: number = 0;
  contador: number = 0;


  constructor(private api: ApiService, private router: Router) { }

  config: any = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Ritmo Cardiaco',
        backgroundColor: [
          'rgba(255, 57, 56, 1)'
        ],
        borderColor: [
          'rgba(255, 57, 56, 1)'
        ],
        data: [

        ]
      }, {
        label: 'Temperatura corporal',
        backgroundColor: [
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)'
        ],
        data: [

        ]
      }, {
        label: 'Oxígeno en la Sangre',
        backgroundColor: [
          'rgba(59, 57, 255, 1)'
        ],
        borderColor: [
          'rgba(59, 57, 255, 1)'
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
        display: false,
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
            labelString: 'Cantidad de Mediciones'
          }
        }]
      }
    }
  };

  ngOnInit(): void {
    this.checkLocalStorage();
    this.updateCount();
    this.siFunciona();

    const objectVar___ = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 1
    };
    this.api.rcGET(objectVar___).subscribe(data => {
      this.datos = data;
      var d1 = this.datos[0].valor;

      google.charts.load('current', { 'packages': ['gauge'] });
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var Trefresh = 1000; //ms
        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['SpO2', 0],
        ]);
        var options = {
          min: 0, max: 100,
          width: 120, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom: 80, yellowTo: 90,
          minorTicks: 5
        };
        var chart = new google.visualization.Gauge(document.getElementById('chart_divOS'));
        chart.draw(data, options);

        setInterval(function () {
          data.setValue(0, 1, d1);
          chart.draw(data, options);
        }, Trefresh);
      }
    });
  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  siFunciona() {
    var datoentero = 0;
    //this.enviaData();
    //this.enviaDataTC();
    //this.enviaDataOS();
    if (this.contador < 1) {
      var myLineChart = new Chart('graficaHistorial', this.config);
      this.api.getHistorialGeneral(Number(localStorage.getItem('idCouch'))).subscribe(data => {
        this.histoUser = data;
        var fechas: any = [];
        var rirmocardiaco: number = 0;
        var temperaturacorporal: number = 0;
        var oxigenosangre: number = 0;
        for (var i = 0; i < this.histoUser.length; i++) {
          fechas.push(this.histoUser[i].fecha.split('T', 1)[0]);
          if (this.histoUser[i].id_medicion == 1) { oxigenosangre++; } // oximetro
          if (this.histoUser[i].id_medicion == 2) { rirmocardiaco++; } // pulso
          if (this.histoUser[i].id_medicion == 3) { temperaturacorporal++; } // temperatura
        }
        var unique = fechas.filter(this.onlyUnique);
        if (this.config.data.datasets.length > 0) {
          this.config.data.labels.pop();
          this.config.data.datasets.forEach(function (dataset: any) {
            dataset.data.pop();
          });
          myLineChart.update();
          this.config.data.labels = unique; // labels de la grafica
          var cuenta = 0;
          this.config.data.datasets.forEach(function (dataset: any) {
            cuenta++;
            if (cuenta == 1) { // ritmo cardiaco
              dataset.data.push(rirmocardiaco);
            } else if (cuenta == 2) {
              dataset.data.push(temperaturacorporal); // temperatura corporal
            } else {
              dataset.data.push(oxigenosangre); // oxigeno en la sangre
              cuenta = 0;
            }
          });
          myLineChart.update();
        }
      });
    }

    // pulso cardiaco
    const objectVar_ = {
      id_usuario: localStorage.getItem('idCouch'),
      id_medicion: 2
    };
    datoentero = datoentero + 1;
    this.api.rcGET(objectVar_).subscribe(data => {
      this.datos = data;
      if (this.datos.length > 0) {
        var d1 = this.datos[0].valor;
        google.charts.load('current', { 'packages': ['gauge'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['BPM', 0],
          ]);
          var options = {
            min: 0, max: 1000,
            width: 120, height: 120,
            redFrom: 900, redTo: 1000,
            yellowFrom: 750, yellowTo: 900,
            minorTicks: 5
          };
          var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
          data.setValue(0, 1, d1);
          chart.draw(data, options);
        }
        //"2021-02-27T10:20:37.000Z"
        this.fechaIzq = this.datos[0].fecha.split("T", 1)[0];
        this.fechaDer = this.datos[0].fecha.split("T", 2)[1].split(".", 1)[0];
        this.ultimaMedicioRC = this.fechaIzq + " " + this.fechaDer;
        this.ultRC = this.datos[0].valor.toFixed(0);
        //(<HTMLInputElement>document.getElementById("inputRCwid")).value = this.ultRC;
        if (this.contador < 2) {
          this.api.promedio(objectVar_).subscribe(data => {
            var JSONArray = JSON.parse(JSON.stringify(data));
            let dataResponse: ResponseI = JSONArray[0];
            let dataResponseI: ResponseII = JSON.parse(dataResponse.consulta);
            this.primedioRC = Number(dataResponseI.message).toFixed(2);
            //console.log(this.primedioRC);
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
      if (this.datos_.length > 0) {
        var d1 = this.datos_[0].valor;
        google.charts.load('current', { 'packages': ['gauge'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['°C', 0],
          ]);
          var options = {
            min: 0, max: 100,
            width: 120, height: 120,
            redFrom: 40, redTo: 100,
            yellowFrom: 37, yellowTo: 40,
            minorTicks: 10
          };
          var chart = new google.visualization.Gauge(document.getElementById('chart_divTC'));
          data.setValue(0, 1, d1);
          chart.draw(data, options);
        }
        this.fechaIzq_ = this.datos_[0].fecha.split("T", 1)[0];
        this.fechaDer_ = this.datos_[0].fecha.split("T", 2)[1].split(".", 1)[0];
        this.ultimaMedicioRC_ = this.fechaIzq_ + " " + this.fechaDer_;
        this.ultTC = this.datos_[0].valor.toFixed(2);
        //(<HTMLInputElement>document.getElementById("inputTCwid")).focus(); 
        $('input').blur();
        if (this.contador < 2) {
          this.api.promedio(objectVar__).subscribe(data => {
            var JSONArray = JSON.parse(JSON.stringify(data));
            let dataResponse: ResponseI = JSONArray[0];
            let dataResponseI: ResponseII = JSON.parse(dataResponse.consulta);
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
      if (this.datos__.length > 0) {
        var d1 = this.datos__[0].valor;
        google.charts.load('current', { 'packages': ['gauge'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['SpO2', 0],
          ]);
          var options = {
            min: 0, max: 100,
            width: 120, height: 120,
            redFrom: 90, redTo: 100,
            yellowFrom: 80, yellowTo: 90,
            minorTicks: 5
          };
          var chart = new google.visualization.Gauge(document.getElementById('chart_divOS'));
          data.setValue(0, 1, d1);
          chart.draw(data, options);
        }
        this.fechaIzq__ = this.datos__[0].fecha.split("T", 1)[0];
        this.fechaDer__ = this.datos__[0].fecha.split("T", 2)[1].split(".", 1)[0];
        this.ultimaMedicioRC__ = this.fechaIzq__ + " " + this.fechaDer__;
        this.ultOS = this.datos__[0].valor.toFixed(2);
        //(<HTMLInputElement>document.getElementById("inputOSwid")).focus(); 
        $('input').blur();
        if (this.contador < 2) {
          this.api.promedio(objectVar___).subscribe(data => {
            var JSONArray = JSON.parse(JSON.stringify(data));
            let dataResponse: ResponseI = JSONArray[0];
            let dataResponseI: ResponseII = JSON.parse(dataResponse.consulta);
            this.primedioOS = Number(dataResponseI.message).toFixed(2);
          });
        }
      }
    });
    //. oxigeno en la sangre
    this.contador += datoentero;
    if (this.contador == 10) {
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
    this.api.countCoachAtletas().subscribe(data => {
      var JSONArray = JSON.parse(JSON.stringify(data));
      let dataResponse: ResponseI = JSONArray[0];
      let dataResponseI: ResponseII = JSON.parse(dataResponse.consulta);
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

  checkLocalStorage() {
    if (localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "0") { // dashboard atleta
      this.router.navigate(['dashboard']);
    } else if (localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "1") { // dashboard couch
      this.router.navigate(['dashboardcouch']);
      this.onInfoPerfil();
    } else {
      this.router.navigate(['login']);
    }
  }

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
    localStorage.removeItem('idAtleta');
    localStorage.removeItem('idCouch');
    this.router.navigate(['login']);
  }

  onContacto() {

  }

  onRCRitmo() {
    this.router.navigate(['ritmocouch']);
  }

  onTCTemperatura() {
    this.router.navigate(['temperaturacouch']);
  }

  onOCOxigeno() {
    this.router.navigate(['oxigenocouch']);
  }

  onInfoPerfil() {
    this.api.infoByUser().subscribe(data => {
      this.iUser = data;
      this.nombreDash = this.iUser[0].nombre.split(" ", 1) + " " + this.iUser[0].apellido.split(" ", 1);
      this.username = this.iUser[0].username;
      this.idCouch = this.iUser[0].id_usuario;
      localStorage.setItem("idCouch", this.idCouch);

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

    });
  }

}
