import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  {
    path: 'login',
    
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'profesor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./login/profesor/profesor.module').then( m => m.ProfesorPageModule)
    
  },
  {
    path: 'alumno',
    canActivate: [AuthGuard],
    loadChildren: () => import('./login/alumno/alumno.module').then( m => m.AlumnoPageModule),

  },
  
  {
    path: 'asistencia',
    canActivate: [AuthGuard],
    loadChildren: () => import('./login/profesor/asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    
  },
  
  {
    path: 'recuperar',
    canActivate: [AuthGuard],
    loadChildren: () => import('./login/recuperar/recuperar.module').then( m => m.RecuperarPageModule),
    
  }
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

