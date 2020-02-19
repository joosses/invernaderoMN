import { Component, OnInit } from '@angular/core';

import {ActuadorServiceService} from 'src/app/servicio/actuador-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invernaderoUno';
  public identity;
  public token;

  actuadores;
  constructor(public actuadorServices: ActuadorServiceService, public _usuarioService: UsuarioServiceService){
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(){
    this.getActuador();
  }
  getActuador(){
    this.actuadorServices.getActuador().subscribe(response =>{
      if(response.status =='success'){
        this.actuadores=response.actuador;
        console.log(this.actuadores);
      }
    },
      err=>console.log(err)
    )
  }
}
