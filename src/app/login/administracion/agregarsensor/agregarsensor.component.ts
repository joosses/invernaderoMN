import { Component, OnInit } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';
import {SensorServiceService} from 'src/app/servicio/sensor-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { Sensor } from 'src/app/modelos/Sensor';

@Component({
  selector: 'app-agregarsensor',
  templateUrl: './agregarsensor.component.html',
  styleUrls: ['./agregarsensor.component.css']
})
export class AgregarsensorComponent implements OnInit {

  public sensor: Sensor;
  public status: String;
  public identity;
  public token;


  public datos;
 
  constructor(public sensorService: SensorServiceService, public _usuarioService: UsuarioServiceService) {
    this.sensor = new Sensor(null, '', '', '', null, null,null,null);
    this.identity = this._usuarioService.getIdentity();
  }
  ngOnInit() {
  }
  onSubmit(form) {
    console.log(this.sensor);
    this.sensorService.register(this.sensor).subscribe(
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
