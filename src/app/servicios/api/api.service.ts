import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { ListaUsuariosI, ListaUsuariosII, ListaUsuariosIII, EnvioDeDataAssignAtletaACouch,infoAtleta,enviarDataRC,enviarDataRCGET,histo,resgistro } from '../../modelos/listausuarios.interface';
import { ResponseI, ResponseIIII, DatosUser,ResponseDataRC,TempMinMax } from '../../modelos/response.interface';
import { InfoUser } from '../../modelos/response.interface';
import { InfoUserCaracterisitica } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //url:string = "https://1ggozdi7qb.execute-api.us-east-2.amazonaws.com/";
  url:string = "http://localhost:3000";
  url_:string = "https://1ggozdi7qb.execute-api.us-east-2.amazonaws.com/etapa_prueba";

  constructor(private http:HttpClient) { }

  /**
   * API POST
   * @param form 
   * utilizada en el login, recive {username: "erickace", password: "erickace"}
   */
  loginByUser(form:LoginI):Observable<ResponseI>{
    //let direccion = this.url + "etapa_prueba/login";
    //let direccion = this.url + "/login";
    let direccion = this.url_ + "/login";
    console.log(form);
    return this.http.post<ResponseI>(direccion,form);
  }

  /**
   * API GET
   * @param form 
   */
  getAllUsuarios():Observable<ListaUsuariosI[]>{
    //let direccion = this.url + "etapa_prueba";
    let direccion = this.url + "/";
    return this.http.get<ListaUsuariosI[]>(direccion);
  }

  /**
   * API POST
   * @param 
   * Utilizda para retornar datos del usuario segun username, recive {username: "nombre de username"}
   */
  infoByUser():Observable<InfoUser[]>{
    const currentUsername = localStorage.getItem('username');
    const objectVar = {username: currentUsername};
    //let direccion = this.url + "/infoUser";
    let direccion = this.url_ + "/infouser";
    return this.http.post<InfoUser[]>(direccion,objectVar);
  }

  /**
   * API POST
   * @param 
   * Utilizda para retornar datos secundarios del usuario segun id de usuario, recive {id_username: id_username}
   */
  infoByUserCaracteristicas(id:number):Observable<InfoUserCaracterisitica[]>{
    const currentUserId = id;
    const objectVar = {id_usuario: currentUserId};
    //let direccion = this.url + "/infoUserCaracteristica";
    let direccion = this.url_ + "/infousercarac";
    return this.http.post<InfoUserCaracterisitica[]>(direccion,objectVar);
  }

  /**
   * API POST
   * @param form 
   * utilizada en el login, recive {username: "erickace", password: "erickace"}
   */
  editUserProfile(data:DatosUser):Observable<ResponseIIII>{
    //let direccion = this.url + "etapa_prueba/login";
    //let direccion = this.url + "/editarUsuario";
    let direccion = this.url_ + "/editarusuario";
    return this.http.post<ResponseIIII>(direccion,data);
  }

  /**
   * API POST
   * @param form 
   */
  getAllUsersForCouch():Observable<ListaUsuariosIII[]>{
    const currentIdCouch = localStorage.getItem('idCouch');
    const objectVar = {id_coach: currentIdCouch};
    //let direccion = this.url + "/usersAsign";
    let direccion = this.url_ + "/usersasign";
    return this.http.post<ListaUsuariosIII[]>(direccion, objectVar);
  }

  /**
   * API POST
   * @param form 
   * utilizada para asignarle un atleta al couch {id_couch: id_couch, id_atleta: id_atleta, tipo: asignacion o desasignacion}
   */
  assignAteltaforCouch(data:EnvioDeDataAssignAtletaACouch):Observable<ResponseI>{
    //let direccion = this.url + "etapa_prueba/login";
    //let direccion = this.url + "/assignAteltaforCouch";
    let direccion = this.url_ + "/assignatletaforcouch";
    return this.http.post<ResponseI>(direccion,data);
  }

  /**
   * API POST
   * @param form 
   * utilizada para asignarle un atleta al couch {id: id}
   */
  countCoachAtletas():Observable<ResponseI>{
    const currentIdCouch = localStorage.getItem('idCouch');
    const objectVar = {id: currentIdCouch};
    //let direccion = this.url + "/countCoachAtletas";
    let direccion = this.url_ + "/countcoachatletas";
    return this.http.post<ResponseI>(direccion,objectVar);
  }

  /**
   * API POST
   * @param form 
   */
  getAllUsersForCouchAssig():Observable<ListaUsuariosIII[]>{
    const currentIdCouch = localStorage.getItem('idCouch');
    const objectVar = {id: currentIdCouch};
    //let direccion = this.url + "/misatletas";
    let direccion = this.url_ + "/misatletas";
    return this.http.post<ListaUsuariosIII[]>(direccion, objectVar);
  }

  /**
   * API POST
   * @param form 
   */
  getAllInfoUser(id:number):Observable<infoAtleta[]>{
    const objectVar = {id: id};
    //let direccion = this.url + "/textAtleta";
    let direccion = this.url_ + "/textatleta";
    return this.http.post<infoAtleta[]>(direccion, objectVar);
  }

    /**
   * API POST
   * @param form 
   * utilizada para asignarle un atleta al couch {id_usuario: id_usuario, id_medicion: id_medicion, valor: valor}
   */
  rc(data:enviarDataRC):Observable<ResponseI>{
    //let direccion = this.url + "etapa_prueba/login";
    let direccion = this.url_ + "/rc";
    return this.http.post<ResponseI>(direccion,data);
  }

   /**
   * API POST
   * @param form 
   * utilizada para asignarle un atleta al couch {id_usuario: id_usuario, id_medicion: id_medicion, valor: valor}
   */
  rcGET(data:enviarDataRCGET):Observable<ResponseDataRC[]>{
    //let direccion = this.url + "etapa_prueba/login";
    //let direccion = this.url + "/rcGET";
    let direccion = this.url_ + "/rcget";
    return this.http.post<ResponseDataRC[]>(direccion,data);
  }
  
  /**
   * API POST
   * @param form 
   * utilizada para traer promedio
   */
  promedio(data:enviarDataRCGET):Observable<ResponseI>{
    let direccion = this.url_ + "/promedio";
    return this.http.post<ResponseI>(direccion,data);
  }


  /**
   * API POST
   * @param form 
   */
  getHistorialGeneral(id:number):Observable<histo[]>{
    const objectVar = {id_usuario: id};
    let direccion = this.url_ + "/historial";
    return this.http.post<histo[]>(direccion, objectVar);
  }


  /**
   * API POST
   * @param form 
   * utilizada para asignarle un atleta al couch {id_usuario: id_usuario, id_medicion: id_medicion, valor: valor}
   */
  historialUnico(data:enviarDataRCGET):Observable<ResponseDataRC[]>{
    let direccion = this.url_ + "/historiala";
    return this.http.post<ResponseDataRC[]>(direccion,data);
  }

  /**
   * API POST
   * @param form 
   * utilizada para dar temperatura maxima y minima
   */
  minmax(id:number):Observable<TempMinMax[]>{
    const objectVar = {id_usuario: id};
    let direccion = this.url_ + "/minmax";
    return this.http.post<TempMinMax[]>(direccion,objectVar);
  }

  registroDeUsers(data:resgistro):Observable<TempMinMax[]>{
    let direccion = this.url_ + "/registro";
    return this.http.post<TempMinMax[]>(direccion,data);
  }
}
