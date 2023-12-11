
export class Cursos {
    id: number;
    asignatura : string;
    carrera   : string;
    hora : string;
    numero : string;

  
    constructor(id: number,asignatura: string,carrera: string,hora: string, numero: string) {
      this.id = id;
      this.asignatura = asignatura;
      this.carrera = carrera;
      this.hora = hora;
      this.numero = numero;

    }
  }
  