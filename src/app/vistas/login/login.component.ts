import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service'
import { LoginI } from '../../modelos/login.interface'
import { ResponseI,ResponseII } from '../../modelos/response.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn?.addEventListener("click", up_view);
    sign_in_btn?.addEventListener("click", in_view);

    function up_view() {
      container?.classList.add("sign-up-mode");
    }

    function in_view() {
      container?.classList.remove("sign-up-mode");
    }

    let fecha_input:any = document.getElementById('fecha');
    const f_input = document.querySelector("#fecha");
    window.addEventListener('load',function(){
      fecha_input.type = "text";
      f_input?.addEventListener('blur',function(){
        fecha_input.type = "text";
      });

      f_input?.addEventListener('focus',function(){
        fecha_input.type = "date";
      });
    });

    const onFocususername:any =  document.querySelector("#username");
    const cusername:any =  document.querySelector(".cusername");
    const eusername:any =  document.querySelector(".eusername");
    onFocususername.onfocus = function() {llenandousername()};
    function llenandousername() {
      const ecopyusername = document.querySelector('.datovaciouser');
      ecopyusername?.classList.remove('borderColorVacio','borderColorError');
      cusername.style.display = "none";
      eusername.style.display = "none";
    }

    const cpassword:any =  document.querySelector(".cpassword");
    const onFocuspassword:any =  document.querySelector("#password");
    const epassword:any =  document.querySelector(".epassword");
    onFocuspassword.onfocus = function() {llenandopassword()};
    function llenandopassword() {
      const ecopypassword = document.querySelector('.datovaciopass');
      ecopypassword?.classList.remove('borderColorVacio','borderColorError');
      cpassword.style.display = "none";
      epassword.style.display = "none";
    }

  }

  checkLocalStorage(){
    if(localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "0"){ // dashboard atleta
      this.router.navigate(['dashboard']);
    }else if(localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "1"){ // dashboard couch
      this.router.navigate(['dashboardcouch']);
    }else{
      this.router.navigate(['login']);
    }
  }

  onLogin(form:LoginI){
    //this.api.getAllUsuarios().subscribe(data =>{
    //  console.log(data);
    //});
    
      
      //console.log(form);
      let u_vacio = 0;
      let p_vacio = 0;
      const cpassword:any =  document.querySelector(".cpassword");
      const cusername:any =  document.querySelector(".cusername");
      const eusername:any =  document.querySelector(".eusername");
      const epassword:any =  document.querySelector(".epassword");

      /**
       * funcion movimiento temblor, dos formas en warning y en error
       */
      var shakingElements:any = [];
      var shake = function (element:any, magnitude = 16, angular = false) {
        var tiltAngle = 1;
        var counter = 1;
        var numberOfShakes = 15;
        var startX = 0,
            startY = 0,
            startAngle = 0;
        var magnitudeUnit = magnitude / numberOfShakes;

        var randomInt = (min:any, max:any) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        if(shakingElements.indexOf(element) === -1) {
          shakingElements.push(element);
          if(angular) {
            angularShake();
          } else {
            upAndDownShake();
          }
        }

        function upAndDownShake() {
          if (counter < numberOfShakes) {
            element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
            magnitude -= magnitudeUnit;
            var randomX = randomInt(-magnitude, magnitude);
            var randomY = randomInt(-magnitude, magnitude);
            element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
            counter += 1;
            requestAnimationFrame(upAndDownShake);
          }
          if (counter >= numberOfShakes) {
            element.style.transform = 'translate(' + startX + ', ' + startY + ')';
            shakingElements.splice(shakingElements.indexOf(element), 1);
          }
        }
        
        function angularShake() {
          if (counter < numberOfShakes) {
            //console.log(tiltAngle);
            element.style.transform = 'rotate(' + startAngle + 'deg)';
            magnitude -= magnitudeUnit;
            var angle = Number(magnitude * tiltAngle).toFixed(2);
            //console.log(angle);
            element.style.transform = 'rotate(' + angle + 'deg)';
            counter += 1;
            tiltAngle *= -1;
            requestAnimationFrame(angularShake);
          }
          if (counter >= numberOfShakes) {
            element.style.transform = 'rotate(' + startAngle + 'deg)';
            shakingElements.splice(shakingElements.indexOf(element), 1);
          }
        }
      };
      ///
      //validando campos vacios
      if(form.username == ""){ // campo username vacio
        const ecopyusername = document.querySelector('.datovaciouser');
        ecopyusername?.classList.add('borderColorVacio');
        cusername.style.display = "block";
        shake(ecopyusername, 2, true);
        u_vacio = 1;
      }

      if(form.password == ""){ // campo passwrord vacio
        const ecopypassword = document.querySelector('.datovaciopass');
        ecopypassword?.classList.add('borderColorVacio');
        cpassword.style.display = "block";
        shake(ecopypassword, 2, true);
        p_vacio = 1;
      }

      if(u_vacio == 0 && p_vacio == 0){ // ningun campo vacio -> ok
        const ecopyusername = document.querySelector('.datovaciouser');
        const ecopypassword = document.querySelector('.datovaciopass');
        ecopyusername?.classList.remove('borderColorVacio');
        ecopypassword?.classList.remove('borderColorVacio');
        cusername.style.display = "none";
        cpassword.style.display = "none";
        
        // verificando desde api
        this.api.loginByUser(form).subscribe(data => {
          var JSONArray = JSON.parse(JSON.stringify(data)); 
          let dataResponse:ResponseI = JSONArray[0]; 
          let dataResponseI:ResponseII = JSON.parse(dataResponse.consulta);
          if(dataResponseI.status == 'ok'){
            localStorage.setItem("username",form.username);
            localStorage.setItem("es_entrenador",dataResponseI.es_coach);
            if(dataResponseI.es_coach == "0"){ // es atleta
              this.router.navigate(['dashboard']);
            }else{ // es couch
              this.router.navigate(['dashboardcouch']);
              window.location.href = "";
            }
          }else{
            if(dataResponseI.message == "Usuario no Existe"){
              const ecopyusername = document.querySelector('.datovaciouser');
              ecopyusername?.classList.add('borderColorError');
              eusername.style.display = "block";
              shake(ecopyusername);
            }
            if(dataResponseI.message == "Password no coincide"){
              const ecopypassword = document.querySelector('.datovaciopass');
              ecopypassword?.classList.add('borderColorError');
              epassword.style.display = "block";
              shake(ecopypassword);
            }
          }
          //console.log(dataResponse.consulta);
          //console.log(dataResponseI.status);
          //console.log(dataResponseI.message);
          //console.log(dataResponseI.es_coach);
        });
      }
  }

  nombre:any = "";
  apellido:any = "";
  fecha:any = "";
  username:any = "";
  password:any = "";
  couching:any = "";
  edad:any = "";
  sexo:any = "";
  peso:any = "";
  estatura:any = "";
  direccion:any = "";
  telefono:any = "";
  registrar(){
    this.username = (<HTMLInputElement>document.getElementById("username")).value;
    this.nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
    this.apellido = (<HTMLInputElement>document.getElementById("apellido")).value;
    this.password = (<HTMLInputElement>document.getElementById("password")).value;
    this.fecha = (<HTMLInputElement>document.getElementById("fecha")).value;
    this.couching = (<HTMLInputElement>document.getElementById("couching")).value;
    this.edad = 25;
    this.sexo = (<HTMLInputElement>document.getElementById("genero")).value;
    this.peso = 0;
    this.estatura = 0;
    this.direccion = 0;
    this.telefono = 0;

    const objectVar__ = {
      username: this.username,
      nombre: this.nombre,
      apellido: this.apellido,
      password: this.password,
      fecha_nac: this.fecha,
      es_couch: this.couching,
      edad: this.edad,
      sexo: this.sexo,
      peso: this.peso,
      estatura: this.estatura,
      direccion: this.direccion,
      telefono: this.telefono
    };
    this.api.registroDeUsers(objectVar__).subscribe(data => {
      alert("Usuario registrado correctamente!.");
    });
  }
  /*onEntrar(){
    localStorage.setItem("username","erickace");
    localStorage.setItem("es_entrenador","1");
    this.router.navigate(['dashboardcouch']);
  }*/

}

