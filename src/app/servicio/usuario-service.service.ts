import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../modelos/Usuario';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  public url: string;
  constructor(public _http:HttpClient) {
    this.url = global.url;
   }
   
  public test(){
     return "hola esto es un servicio";
  }
  register(usuario):Observable<any>{
    let json =JSON.stringify(usuario);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/crear',{headers: headers});
  }
}