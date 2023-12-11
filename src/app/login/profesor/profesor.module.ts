import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfesorPageRoutingModule } from './profesor-routing.module';
import { ProfesorPage } from './profesor.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfesorPage]
})
export class ProfesorPageModule {}
