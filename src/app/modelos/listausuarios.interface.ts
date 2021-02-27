export interface ListaUsuariosI{
    id_usuario:string;
    username:string;
    nombre:string;
    apellido:string;
    password:string;
    fecha_creacion:string;
    fecha_nac:string;
    id_coach:string;
}

export interface ListaUsuariosII{
    id_usuario:string;
    username:string;
    nombre:string;
    apellido:string;
    password:string;
    fecha_creacion:string;
    fecha_nac:string;
    id_coach:string;
}


export interface ListaUsuariosIII{
    id_usuario:any;
    username:any;
    nombre:any;
    apellido:any;
    password:any;
    fecha_creacion:any;
    id_coach:any;
    fecha_nac:any;
    es_couch:any;
}

export interface EnvioDeDataAssignAtletaACouch{
    id_couch:any;
    id_atleta:any;
    tipo:string;
}

export interface misAtletas{
    id_usuario:string;
    username:string;
    nombre:string;
    apellido:string;
    password:string;
    fecha_creacion:string;
    id_coach:string;
    fecha_nac:string;
    es_couch:string;
}

export interface infoAtleta{
    username:any;
    nombre:any;
    apellido:any;
    fecha_creacion:any;
    fecha_nac:any;
    edad:any;
    sexo:any;
    peso:any;
    estatura:any;
    direccion:any;
    telefono:any;
}

export interface enviarDataRC{
    id_usuario:any;
    id_medicion:any;
    valor:any;
}

export interface enviarDataRCGET{
    id_usuario:any;
    id_medicion:any;
}

export interface ResponseDataRC_ {
    id_usuario:any;
    id_medicion:any;
    valor:any;
    fecha:any;
}


export interface histo{
    id_usuario:any;
    id_medicion:any;
    valor:any;
    fecha:any;
}