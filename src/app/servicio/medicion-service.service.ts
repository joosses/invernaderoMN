import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';


@Injectable({
  providedIn: 'root'
})
export class MedicionServiceService {

  url;
  headers;

  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');


  }
  //DEspues para cada sensor NICO QLO
  getMedicionTemperatura():Observable<any>{
    return this.http.get(this.url+'medicionTemperatura',{headers:this.headers});
  }
  getMedicionHumedad():Observable<any>{
    return this.http.get(this.url+'medicionHumedad',{headers:this.headers});
  }
  getMedicionHumedadSuelo():Observable<any>{
    return this.http.get(this.url+'medicionHumedadSuelo',{headers:this.headers});
  }
  getMedicionCo2():Observable<any>{
    return this.http.get(this.url+'medicionCo2',{headers:this.headers});
  }

}