import { Component, OnInit } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';
import {ActuadorServiceService} from 'src/app/servicio/actuador-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { Actuador } from 'src/app/modelos/Actuador';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregaractuador',
  templateUrl: './agregaractuador.component.html',
  styleUrls: ['./agregaractuador.component.css']
})
export class AgregaractuadorComponent implements OnInit {

  public actuador: Actuador;
  public status: String;
  public identity;
  public token;
  public invernadero;
  constructor(public actuadotService: ActuadorServiceService, public _usuarioService: UsuarioServiceService, public invernaderoService: InvernaderoServiceService) {
    this.actuador = new Actuador(null, null, '', '', null);
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit() {
    this.getinvernaderoSelect();
  }
  getinvernaderoSelect() {
    
    this.invernaderoService.getInvernaderoLista().subscribe( response => {
      if (response.status == 'success') {


    }
   
        this.invernadero = response.invernadero;
       

          console.log("Los invernaderos : " + this.invernadero);
        
        
      
    },
      err => console.log(err)
    )
  }
  onSubmit(form) {
    console.log(this.actuador);
    this.actuadotService.register(this.actuador).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actuador agregado correctamente',
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

}