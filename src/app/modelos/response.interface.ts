export interface ResponseI{
    consulta:any;
}

export interface ResponseII{
    status:any;
    message:any;
    es_coach:any;
}

export interface ResponseIII{
    id_usuario:any;
    username:any;
    nombre:any;
    apellido:any;
    fecha_creacion:any;
    id_coach:any;
    fecha_nac:any;
    es_couch:any;
}

export interface ResponseIIII{
    consulta:any;
}

export interface InfoUser{
    id_usuario:any;
    username:any;
    nombre:any;
    apellido:any;
    fecha_creacion:any;
    id_coach:any;
    fecha_nac:any;
    es_couch:any;
}

export interface InfoUserCaracterisitica{
    id_usuario:any;
    edad:any;
    sexo:any;
    peso:any;
    estatura:any;
    direccion:any;
    telefono:any;
}

export interface DatosUser{
    id_usuario:any;
    nombre:any;
    apellido:any;
    fecha_nac:any;
    edad:any;
    sexo:any;
    peso:any;
    estatura:any;
    direccion:any;
    telefono:any;
}

export interface ResponseAtletasI{
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

export interface ResponseDataRC {
    id_usuario:any;
    id_medicion:any;
    valor:any;
    fecha:any;
}
