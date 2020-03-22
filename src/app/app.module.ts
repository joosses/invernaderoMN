import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartsModule} from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdministracionComponent } from './login/administracion/administracion.component';
import { ActuadorComponent } from './login/administracion/actuador/actuador.component';
import { ControlComponent } from './login/administracion/control/control.component';
import { SensorComponent } from './login/administracion/sensor/sensor.component';
import { HistoricoComponent } from './login/administracion/historico/historico.component';
import { RegistroComponent } from './login/registro/registro.component';
import { InvernaderoComponent } from './login/administracion/invernadero/invernadero.component';
import { AgregarsensorComponent } from './login/administracion/agregarsensor/agregarsensor.component';
import { AgregaractuadorComponent } from './login/administracion/agregaractuador/agregaractuador.component';
import { HomeComponent } from './login/administracion/home/home.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import {ListaInvernaderoComponent} from './login/lista-invernadero/lista-invernadero.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'logout/:sure',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'admin',component:AdministracionComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'agregarsensor',
        component:AgregarsensorComponent
      },
      {
        path:'agregaractuador',
        component:AgregaractuadorComponent
      },
      {
        path:'invernadero',
        component:InvernaderoComponent
      },
      {
      path:'listainvernadero',
      component:ListaInvernaderoComponent
      },
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
    HistoricoComponent,
    RegistroComponent,
    InvernaderoComponent,
    AgregarsensorComponent,
    AgregaractuadorComponent,
    ListaInvernaderoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes,{useHash:true}),
    FormsModule,
    ChartsModule,
    HttpClientModule,
    DpDatePickerModule,
    //SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
