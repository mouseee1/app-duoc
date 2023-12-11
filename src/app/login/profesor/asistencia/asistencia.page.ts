import { ChangeDetectorRef,Component, NgZone, OnInit } from '@angular/core';
import { RipService } from '../../rip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  codigoQRUrl: string;
  mostrarCodigoQR: boolean = false;
  alumnos : any[] = [];
  cursoId: string = "";

  

  constructor(private ripservice: RipService, private route: ActivatedRoute,private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.codigoQRUrl = "";
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cursoId = params["cursoId"]
    })

    this.ripservice.alumnos.subscribe(data => {
     
      console.log("data")
      console.log(data)

      // this.ngZone.run(() => {
      //   this.alumnos = data
      // })

      this.alumnos = data.filter((alumno) => alumno.cursoId === this.cursoId)
      this.cdr.detectChanges();
    })

    this.ripservice.getAlumnos()
 
  }

  print() {
    console.log("data 2")
    this.ripservice.getAlumnos()
  }

  generarCodigoQR() {
    // Belem en esta parte puedes poner lo que va a retornar el qr 
    const textoParaQR = JSON.stringify(this.alumnos); // aqui solo puedes poner un mensaje
    const tamañoQR = '200x200';

    this.codigoQRUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(textoParaQR)}&size=${tamañoQR}`;
  }

  cerrarCodigoQR() {
    this.codigoQRUrl = '';
  }
  
}
  




