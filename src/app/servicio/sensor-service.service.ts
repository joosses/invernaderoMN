import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class SensorServiceService {

  url;
  headers;

  constructor(public http:HttpClient) {
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
   }

  getTemperaturaMin():Observable<any>{
    return this.http.get(this.url+'temperaturamin',{headers:this.headers});
  }
  getHumedadMin():Observable<any>{
    return this.http.get(this.url+'humedadmin',{headers:this.headers});
  }
  getHumedadSueloMin():Observable<any>{
    return this.http.get(this.url+'humedadsuelomin',{headers:this.headers});
  }
  getCo2Min():Observable<any>{
    return this.http.get(this.url+'co2min',{headers:this.headers});
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
