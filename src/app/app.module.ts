import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RipService } from './login/rip.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/envieronment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {AngularFireModule}  from '@angular/fire/compat';
import { AuthGuard } from './auth.guard'
  






@NgModule({
  declarations:[AppComponent],
  imports: [ AngularFireModule.initializeApp(environment.firebaseConfig),
             AngularFireDatabaseModule,
             AngularFireAuthModule,
             AngularFirestoreModule,
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},RipService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule {}


