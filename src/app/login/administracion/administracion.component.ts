import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { InvernaderoComponent} from 'src/app/login/administracion/invernadero/invernadero.component';

@Injectable({
  providedIn: 'root'
})

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
  public allDataObj:any;
  public AllDataArr =[];
  public valor:String[];
  constructor(public _usuarioService: UsuarioServiceService, public invernaderoService: InvernaderoServiceService) { 
    this.identity = this._usuarioService.getIdentity();
    
    
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
  
  union():String[]{
    
    this.invernaderoService.getDatosInvernadero().subscribe(response =>{
      if(response.status =='success'){
        
         console.log("id del invernadero: "+response.invernadero[0].id);
         this.valor=JSON.parse(response.invernadero[0].id);
         
      }
      
    },
      err=>console.log(err)
      
    )
    return this.valor;
    
  }


  
  prueba(){
    
    console.log('este es el resultado de union: '+this.union() );
  }
}
