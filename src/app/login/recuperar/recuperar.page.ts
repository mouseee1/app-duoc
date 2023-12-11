import { Component, OnInit } from '@angular/core';
import { AuthService } from '../autenticacion.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
          
  email: string = '';
  
  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }

  recuperarContrasena() {
    this.authService.resetPassword(this.email)
      .then(() => {
        // Éxito: el correo de restablecimiento se ha enviado
        console.log('Correo de restablecimiento enviado');
      })
      .catch((error) => {
        // Error al enviar el correo de restablecimiento
        console.error('Error al enviar el correo de restablecimiento', error);
      });
  }

}




