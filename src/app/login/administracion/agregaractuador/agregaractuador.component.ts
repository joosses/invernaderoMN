import { Component, OnInit } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';
import {ActuadorServiceService} from 'src/app/servicio/actuador-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { Actuador } from 'src/app/modelos/Actuador';
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
  constructor(public actuadotService: ActuadorServiceService, public _usuarioService: UsuarioServiceService) {
    this.actuador = new Actuador(null, null, '', '', null);
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(this.actuador);
    this.actuadotService.register(this.actuador).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          form.reset();
        }
        else {
          this.status = 'error';

        }

        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    )

  }

}
