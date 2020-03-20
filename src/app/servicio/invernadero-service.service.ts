import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer, identity} from 'rxjs';
import {global} from '../modelos/global';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { Invernadero } from '../modelos/Invernadero';

@Injectable({
  providedIn: 'root'
})
export class InvernaderoServiceService {
  public url;
  public headers;
  public identity;
  constructor(public _http:HttpClient, public _usuarioService: UsuarioServiceService) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    this.identity = this._usuarioService.getSub()
  }
  getNombre():Observable<any>{
    return this._http.get(this.url+'invernaderonombre/'+this.identity,{headers:this.headers});
  }

  getDatosInvernadero():any{
    return this._http.get(this.url+'invernaderob/'+this.identity,{headers:this.headers});
  }
  register(invernadero):Observable<any>{
    let json =JSON.stringify(invernadero);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'invernadero/crear', params,{headers: headers});
  }
  getInvernaderos():Observable<any>{
    return this._http.get(this.url+'invernadero',{headers:this.headers});
  }
  getInvernaderoLista():any{
    return this._http.get(this.url+'invernaderoBuscar',{headers:this.headers});
  }
  /*
  public myServiceMethod() {
    return this.http.get(this.url+'invernadero',{headers:this.headers}).map(
      res => res.json() // Transform the JSON string in an object
    );
  }*/
}
