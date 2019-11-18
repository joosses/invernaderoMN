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
  getMedicion():Observable<any>{
    return this.http.get(this.url+'medicion',{headers:this.headers});
  }
}