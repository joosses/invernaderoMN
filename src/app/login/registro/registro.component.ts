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
  public usuario: Usuario;

  constructor( private _usuarioService: UsuarioServiceService) {
    this.page_titulo= 'Registrate';
    this.usuario= new Usuario();
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
    this._usuarioService.register(this.usuario).subscribe(
      Response=>{
        console.log(Response);
        form.reset();
      },
      error =>{
        console.log(<any>error);
      }
    )
    
  }

}