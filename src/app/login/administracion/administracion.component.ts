import { Component, OnInit } from '@angular/core';

import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  mostrarSidebar:boolean=true;
  public identity;
  public token;
  constructor(public _usuarioService: UsuarioServiceService) { 
    this.identity = this._usuarioService.getIdentity()
  }

  ngOnInit() {
  }
  ocultarSidebar(){
    if(this.mostrarSidebar==true){
      this.mostrarSidebar=false;
    }else{
  this.mostrarSidebar=true;      
    }
  }
}
