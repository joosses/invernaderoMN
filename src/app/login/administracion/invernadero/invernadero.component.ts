import { Component, OnInit } from '@angular/core';

import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-invernadero',
  templateUrl: './invernadero.component.html',
  styleUrls: ['./invernadero.component.css']
})
export class InvernaderoComponent implements OnInit {

  public invernadero: Invernadero;
  public status: String;
  public identity;
  public token;
public usuario;
public usuarioNombre;
public usuarioId;
  public datos;
 

  constructor(public invernaderoService: InvernaderoServiceService, public _usuarioService: UsuarioServiceService) {
    this.invernadero = new Invernadero(null, '', '', '', null, null);
    this.identity = this._usuarioService.getIdentity();
  }
  /*
  id:number;
    cultivo:String;
    caracteristicas:String;
    placa: String;
    usuario_id_usuario:number;
    chipid:number;
  */

  ngOnInit() {
    //this.getTodosInvernaderos()
    this.getUsuarioSelect();
    console.log(this.datos);
  }

  onSubmit(form) {
    console.log(this.invernadero);
    this.invernaderoService.register(this.invernadero).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Invernadero agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          form.reset();
        }
        else {
          this.status = 'error';
          Swal.fire({
            icon: 'error',
            title: 'Oops Hay problemas con los datos',
            text: 'Revisa por favor!',
           
          })
        }

        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  getUsuarioSelect() {
    this._usuarioService.getUsuario().subscribe( response => {
      if (response.status == 'success') {


    }
   
        this.usuario = response.usuario;
        this.usuarioNombre= response.usuario.nombre;
        this.usuarioId= response.usuario[0].id;

          console.log("Los usuarios : " + this.usuario);
        
        
      
    },
      err => console.log(err)
    )
  }

  /*
  getTodosInvernaderos():String{
    
		
    this.invernaderoService.getInvernaderos().subscribe(response =>{
      if(response.status =='success'){
        this.datos=JSON.parse(response.invernadero);
        
        
        
        console.log("traemos los invernaderos");
        console.log(this.datos);
      }
    },
      err=>console.log(err)
    )
    return this.datos;

  }
  */
 /*
 private retrieveJson() {
	this.invernaderoService.myServiceMethod().subscribe(
		jsonObject => this.jsonObject = jsonObject
	);
}*/

}