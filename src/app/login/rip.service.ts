import { Injectable } from '@angular/core';
import { Cursos } from './curso.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { switchMap, map, filter } from 'rxjs/operators';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Users } from './user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Alumnos } from './alumno.model';

@Injectable({
  providedIn: 'root',
})
export class RipService {
  currentUser: Observable<Users | null>;

  private _alumnos = new BehaviorSubject<Alumnos[]>([]);

  get alumnos() {
    return this._alumnos.asObservable();
  }

  constructor(
    private router: Router,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserByEmail(user.email || '');
        } else {
          return [];
        }
      }),
      map((user) => user || null)
    );
  }

  getUserByEmail(email: string): Observable<Users | undefined> {
    console.log('email: ' + email);
    return this.firestore
      .collection<Users>('Users', (ref) => ref.where('Email', '==', email))
      .valueChanges()
      .pipe(
        map((users) => {
          console.log(users);
          const foundUser: any = users[0];
          if (foundUser !== null) {
            const user: Users = {
              name: foundUser.Nombre,
              email: foundUser.Email,
              rol: foundUser.Rol,
              password: '',
            };
            return user;
          }
          return;
        })
      );
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado con éxito.');
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error;
    }
  }

   
  async logout(): Promise<void> {
    // try {
    //   await this.afAuth.signOut();
    // } catch (error) {
    //   // Manejar errores de cierre de sesión
    //   console.error('Error al cerrar sesión:', error);
    //   throw error;
    // }

    this.router.navigate(['/login']);
  }

  // getCursos() {
  //   return this.firestore
  //     .collection<Cursos>('Cursos')
  //     .valueChanges()
  //     .pipe(
  //       map((Cursos) => {
  //         console.log(Cursos);
  //         const foundCurso: any = Cursos[0];
  //         if (foundCurso !== null) {
  //           console.log('foundCurso');
  //           console.log(foundCurso);
  //           const curso: Cursos = {
  //             id: foundCurso.Id,
  //             asignatura: foundCurso.Asignatura,
  //             carrera: foundCurso.Carrera,
  //             hora: foundCurso.Hora,
  //             numero: foundCurso.Numero,
  //             alumnos: foundCurso.Alumnos,
  //           };
  //           return curso;
  //         }
  //         return;
  //       })
  //     );
  // }

  getCursos() {
    return this.firestore
      .collection<Cursos>('Cursos')
      .snapshotChanges()
      .pipe(
        map((cursos: any) => {
          // Para cada curso, obtenemos los datos de la colección de alumnos
          return cursos.map((curso: any) => {
            const cursoData = curso.payload.doc.data() as any;
            const cursoId = curso.payload.doc.id;
            return {
              id: cursoId,
              asignatura: cursoData.Asignatura,
              carrera: cursoData.Carrera,
              hora: cursoData.Hora,
              numero: cursoData.Numero,
            };
          });
        })
      );
  }

  getAlumnos(){
    return this.firestore
    .collection<Alumnos>('Alumnos')
    .snapshotChanges()
    .pipe(
      map((alumnos: any) => {
        // Para cada curso, obtenemos los datos de la colección de alumnos
        return alumnos.map((alumno: any) => {
          const alumnoData = alumno.payload.doc.data() as any;
          const alumnoId = alumno.payload.doc.id;
          return {
            id: alumnoId,
            nombre: alumnoData.nombre,
            apellido: alumnoData.apellido,
            edad: alumnoData.edad,
            cursoId: alumnoData.cursoId,
          };
        });
      })
      
    ).subscribe((data: Alumnos[]) => {
      this._alumnos.next(data);
    })
}

marcarAsistencia(cursoId: string, alumnoId: string) {
  const cursoRef = this.firestore.collection('cursos').doc(cursoId);
  cursoRef.collection('alumnos').doc(alumnoId).update({ asistencia: true });

  // Puedes agregar aquí la lógica para enviar un mensaje al alumno si lo deseas
}

}
