  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router'; // Importa Router para realizar redirecciones
  import { RipService } from '../login/rip.service';
  import { AlertController, NavController } from '@ionic/angular';
  import { AngularFireAuth } from '@angular/fire/compat/auth';

  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })
  export class LoginPage implements OnInit {
    email: string = '';
    password: string = '';
  
    


    constructor(private afAuth : AngularFireAuth,private ripservice: RipService, private router: Router, private alertController : AlertController,private navCtrl: NavController) {}
          
    ngOnInit() { 

    }

    async login(email: string, password: string) {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        console.log(userCredential)
        const user = userCredential.user;
  
        if (user) {
          // Obtener datos del usuario desde el servicio RipService
          this.ripservice.getUserByEmail(email).subscribe(user => {
            if (user && user.rol) {
              // Verificar el rol del usuario y redirigirlo a la página correspondiente
              if (user.rol === 'Profesor') {
                this.router.navigate(['/profesor'], {
                  queryParams: user
                });
              } else if (user.rol === 'Alumno') {
                this.router.navigate(['/alumno'], {
                  queryParams: user
                });
              } else {
                console.error('Error: Rol desconocido');
              }
            } else {
              console.error('Error: Usuario no encontrado o sin rol');
            }
          });
        } else {
          console.error('Error de autenticación: No se encontró el usuario');
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
      }
    }
  
}

  

