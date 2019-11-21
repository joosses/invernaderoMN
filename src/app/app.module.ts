import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdministracionComponent } from './login/administracion/administracion.component';
import { ActuadorComponent } from './login/administracion/actuador/actuador.component';
import { ControlComponent } from './login/administracion/control/control.component';
import { SensorComponent } from './login/administracion/sensor/sensor.component';
import { HistoricoComponent } from './login/administracion/historico/historico.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'logout/:sure',component:LoginComponent},
  
  {path:'admin',component:AdministracionComponent,
    children:[
      {
        path:'actuador',
        component:ActuadorComponent
      },
      {
        path:'sensor',
        component:SensorComponent
      },  
      {
        path:'control',
        component:ControlComponent
      }, 
      {
        path:'historico',
        component:HistoricoComponent
      }, 
    ]
  },
  
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministracionComponent,
    ActuadorComponent,
    ControlComponent,
    SensorComponent,
    HistoricoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
