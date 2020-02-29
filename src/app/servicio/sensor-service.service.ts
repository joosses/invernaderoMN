import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';
import { AdministracionComponent } from '../login/administracion/administracion.component';
import { InvernaderoServiceService } from './invernadero-service.service';
import { UsuarioServiceService } from './usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class SensorServiceService {

  url;
  headers;
  id;

  constructor(public http:HttpClient, public administracionService: AdministracionComponent, public usuario:UsuarioServiceService) {
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    this.id=this.usuario.getSub();

   }
   


  getTemperaturaMin():Observable<any>{
    return this.http.get(this.url+'temperaturamin/'+this.id,{headers:this.headers});
  }
  
  getHumedadMin():Observable<any>{
    return this.http.get(this.url+'humedadmin/'+this.id,{headers:this.headers});
  }
  getHumedadSueloMin():Observable<any>{
    return this.http.get(this.url+'humedadsuelomin/'+this.id,{headers:this.headers});
  }
  getCo2Min():Observable<any>{
    return this.http.get(this.url+'co2min/'+this.id,{headers:this.headers});
  }
  /**
   * create crea un nuevo modelo enviandolo al backend
   * @param sensor objeto que contiene los datos de modelo
   */
  update(sensor):Observable<any>{
    let json=JSON.stringify(sensor);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'sensoru/'+sensor.id,params,{headers:headers});
  }
  

}
