import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/Usuario';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioServiceService]
})
export class RegistroComponent implements OnInit {

  public page_titulo: string;
  public usuario:Usuario;
  public status: string;

  constructor( private _usuarioService: UsuarioServiceService) {
    this.page_titulo= 'Registrate';
    this.usuario = new Usuario(null,'','','','');
   }
   /*
   id:number;
   nombre:String;
   telefono:String;
   correo:String;
   contrasena:String;
*/
  ngOnInit() {
    console.log('componente de registro lanzado!!! ngOninit');
    console.log(this._usuarioService.test());
    }
  

  onSubmit(form){
    console.log(this.usuario);
    this._usuarioService.register(this.usuario).subscribe(
      response=>{
        if(response.status =="success"){
          this.status=response.status;
          form.reset();
        }
        else{
          this.status='error';
          
        }
        
        form.reset();
      },
      error =>{
        console.log(<any>error);
      }
    )
    
  }

}