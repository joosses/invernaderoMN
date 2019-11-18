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
}
