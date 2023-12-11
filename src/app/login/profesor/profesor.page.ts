  import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
  import { RipService } from '../rip.service';
  import { Cursos } from '../curso.model';
  import { Alumnos } from '../alumno.model';
  import { ActivatedRoute , Router} from '@angular/router';
  import { LoginPage } from '../login.page';
import { Observable } from 'rxjs';
import { Users } from '../user.model';
import { AlertController } from '@ionic/angular';



  @Component({
    selector: 'app-profesor',
    templateUrl: './profesor.page.html',
    styleUrls: ['./profesor.page.scss'],
  })
  export class ProfesorPage implements OnInit {
    user: Observable<Users | null> | undefined;
    currentUser: Users | null = null;
    cursos : Cursos[] = [];
    alumnos : any[] = [];
  



    constructor(private alertController: AlertController,private router :Router,private ripservice: RipService,private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

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

    
    this.ripservice.getCursos().subscribe(data => {
      console.log("data")
      console.log(data)
      this.cursos = data
      this.cdr.detectChanges();
    })

    
  
    }

    goAlumnos(cursoId: any) {
      // Redirigir a la página de asistencia con el ID del curso como parámetro
      this.router.navigate(['/asistencia'],{
        queryParams : {cursoId:cursoId}
      });
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
    
    
  
}
