import { Component, OnInit } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';
import {SensorServiceService} from 'src/app/servicio/sensor-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { Sensor } from 'src/app/modelos/Sensor';
import Swal from 'sweetalert2';

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
  public invernadero;


  public datos;
 
  constructor(public sensorService: SensorServiceService, public _usuarioService: UsuarioServiceService, public invernaderoService:InvernaderoServiceService) {
    this.sensor = new Sensor(null, '', '', '', null, null,null,null);
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
    console.log(this.sensor);
    this.sensorService.register(this.sensor).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          form.reset();
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