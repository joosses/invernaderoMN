import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/Usuario';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import Swal from 'sweetalert2';


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
    this.usuario = new Usuario(null,'','','','','','','',null);
   }
   
  ngOnInit() {
    console.log('componente de registro lanzado!!! ngOninit');
    console.log(this._usuarioService.test());
    }
  

  onSubmit(form){
    Swal.fire({
      title: 'Registrar Usuario?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {
        console.log(this.usuario);
        console.log("ROL; "+this.usuario.rol);
    this._usuarioService.register(this.usuario).subscribe(
      response=>{
        if(response.status =="success"){
          this.status=response.status;
          form.reset();
          Swal.fire(
            'Agregado!',
            'Fuiste creado exitosamente!!!!',
            'success'
          )
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
    })
    
    
  }
  


}