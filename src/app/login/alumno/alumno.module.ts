import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlumnoPageRoutingModule } from './alumno-routing.module';
import { AlumnoPage } from './alumno.page';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: AlumnoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlumnoPage]
})
export class AlumnoPageModule {}
