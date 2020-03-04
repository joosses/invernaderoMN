import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';
import { UsuarioServiceService } from './usuario-service.service';


@Injectable({
  providedIn: 'root'
})
export class MedicionServiceService {

  url;
  headers;
  id;

  constructor(public http:HttpClient, public usuario:UsuarioServiceService) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    this.id=this.usuario.getSub();


  }
  //DEspues para cada sensor NICO QLO
  getMedicionTemperatura():Observable<any>{
    return this.http.get(this.url+'mediciontemperatura/'+this.id,{headers:this.headers});
  }
  getgraficaH():Observable<any>{
    return this.http.get(this.url+'graficah/'+this.id,{headers:this.headers});
  }
  getgraficaHS():Observable<any>{
    return this.http.get(this.url+'graficahs/'+this.id,{headers:this.headers});
  }
  getgraficaC():Observable<any>{
    return this.http.get(this.url+'graficac/'+this.id,{headers:this.headers});
  }
  getgrafica():Observable<any>{
    return this.http.get(this.url+'graficat/'+this.id,{headers:this.headers});
  }
  getMedicionHumedad():Observable<any>{
    return this.http.get(this.url+'medicionhumedad/'+this.id,{headers:this.headers});
  }
  getMedicionHumedadSuelo():Observable<any>{
    return this.http.get(this.url+'medicionhumedadsuelo/'+this.id,{headers:this.headers});
  }
  getMedicionCo2():Observable<any>{
    return this.http.get(this.url+'medicionco2/'+this.id,{headers:this.headers});
  }

}