import { Component, OnInit } from '@angular/core';

import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  mostrarSidebar:boolean=true;
  public identity;
  public token;
  public idInv;
  public var;
  constructor(public _usuarioService: UsuarioServiceService, public invernaderoService: InvernaderoServiceService) { 
    this.identity = this._usuarioService.getIdentity()
  }

  ngOnInit() {
    this.union();
    this.prueba();
  }
  ocultarSidebar(){
    if(this.mostrarSidebar==true){
      this.mostrarSidebar=false;
    }else{
  this.mostrarSidebar=true;      
    }
  }
  
  union(){
    this.invernaderoService.getDatosInvernadero().subscribe(response =>{
      if(response.status =='success'){
        
         console.log("id del invernadero: "+response.invernadero[0].id);
          return response.invernadero[0].id;
      }
      
    },
      err=>console.log(err)
      
    )
    
  }





  
  prueba(){
    this.var=this.union();
    console.log('este es el resultado de union: '+this.var );
  }
}
