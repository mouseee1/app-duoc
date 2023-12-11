import { Component, OnInit } from '@angular/core';
import { RipService } from '../rip.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Observable } from 'rxjs';
import { Users } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  user: Observable<Users | null> | undefined;
  currentUser: Users | null = null;
  imagenCapturada: string | null = null;

  constructor(private ripservice: RipService, private activatedRoute: ActivatedRoute,private alertController: AlertController) { }

  ngOnInit() {
    console.log("this.ripservice.currentUser");
    console.log(this.ripservice.currentUser);
    this.activatedRoute.queryParams.subscribe((params) => {
      const user: Users = {
        name: params["name"],
        email: params["email"],
        rol: params["rol"],
        password: ""
      }

      this.currentUser= user
    })
  }
  

  cerrarSesion() {
    this.mostrarAlertaConfirmacion();
  }
  
  async mostrarAlertaConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // El usuario ha cancelado, no hagas nada.
          }
        }, {
          text: 'Cerrar Sesión',
          handler: () => {
            // Cerrar sesión
            this.ripservice.logout();
          }
        }
      ]
    });
  
    await alert.present();
  }























  async abrirCamara() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false, 
      resultType: CameraResultType.Base64, // Puedes cambiar esto si deseas obtener una URL u otro formato
    });
  
    const codigoQRBase64 = image.base64String;
    // Ahora puedes procesar el código QR, por ejemplo, enviarlo a un servidor para su validación
  }
}
   


