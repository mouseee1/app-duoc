



export class Users {
    name: string;
    email: string;
    password: string;
    rol: 'Profesor' | 'Alumno' | undefined;

    
    constructor(name: string, email: string, password: string, rol: 'Profesor' | 'Alumno') {
        this.name = name;
        this.email = email;
        this.password = password;
        this.rol =rol;
      }
    }


