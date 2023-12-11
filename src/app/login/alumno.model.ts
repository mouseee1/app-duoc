export class Alumnos {
    id : number;
    nombre: string;
    apellido: string;
    edad :  number;
    cursoId: string;

    constructor ( id: number ,nombre: string, apellido: string, edad : number, cursoId: string ) {
     {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.cursoId = cursoId;
     }

}

}
