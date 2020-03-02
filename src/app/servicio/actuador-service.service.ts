import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class ActuadorServiceService {

  url;
  headers;

  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');


  }
  getActuador():Observable<any>{
    return this.http.get(this.url+'actuador',{headers:this.headers});
  }

  getLuzActual():Observable<any>{
    return this.http.get(this.url+'actuadorluz',{headers:this.headers});
  }
  
  getExtractorActual():Observable<any>{
    return this.http.get(this.url+'actuadorextractor',{headers:this.headers});
  }
  getAguaActual():Observable<any>{
    return this.http.get(this.url+'actuadoragua',{headers:this.headers});
  }
  

  /**
   * create crea un nuevo modelo enviandolo al backend
   * @param actuador objeto que contiene los datos de modelo
   */
  update(actuador):Observable<any>{
    let json=JSON.stringify(actuador);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'actuadoru/'+actuador.id,params,{headers:headers});
  }
  
  /**
  *@param actuador
  */
  updatedos(actuador):Observable<any>{
    let json=JSON.stringify(actuador);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'actuadorreset/'+actuador.id,params,{headers:headers});
  }
  register(actuador):Observable<any>{
    let json =JSON.stringify(actuador);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url+'actuador/registrar', params,{headers: headers});
  }

}
