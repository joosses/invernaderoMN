import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer, identity} from 'rxjs';
import {global} from '../modelos/global';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class InvernaderoServiceService {
  public url;
  public headers;
  public identity;
  constructor(public http:HttpClient, public _usuarioService: UsuarioServiceService) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    this.identity = this._usuarioService.getSub()
  }
  
  getDatosInvernadero():Observable<any>{
    return this.http.get(this.url+'invernaderob/'+this.identity,{headers:this.headers});
  }
}
