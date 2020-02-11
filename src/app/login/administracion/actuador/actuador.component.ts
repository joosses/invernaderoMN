import { Component, OnInit } from '@angular/core';
import {Sensor} from 'src/app/modelos/Sensor';
import {SensorServiceService} from 'src/app/servicio/sensor-service.service';


@Component({
  selector: 'app-actuador',
  templateUrl: './actuador.component.html',
  styleUrls: ['./actuador.component.css']
})
export class ActuadorComponent implements OnInit {

  public sensor:Sensor={id:null,nombre:"",estado:"",caracteristica:"",invernadero_id_invernadero:null,tiempo:null,minimo:null,maximo:null};
  public status;
  
  
  constructor(public sensorService:SensorServiceService) { 
    
  }

  ngOnInit() {
    this.getTemp();
  }

  /**
   * onSubmit crea o actualiza un modelo según el this.modelo
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar modelo)
   */

   getTemp(){
    this.sensorService.getTemperaturaMin().subscribe(response =>{
      if(response.status =='success'){
        
        this.sensor=response.tiempo;

        console.log(this.sensor);
      }
    },
      err=>console.log(err)
    )
   }
  onSubmit(form){
    /* 
    if(this.sensor.id==null){
      //crear un modelo
      console.log("guardara variables");
     
      this.sensorService.create(this.estudiante).subscribe(
        response=>{
          if(response.status=="success"){
            
            this.estudiante=response.estudiante;
            this.status="success";
            this.getEstudiantes();
            this.getEstudiantesi();
            this.estudiante.id=null;
            this.estudiante.rut="";
            this.estudiante.nombre="";
            this.estudiante.apellido="";
            this.estudiante.fecha_nacimiento=null;
            this.estudiante.direccion="";
            this.estudiante.curso="";
            this.estudiante.personas_vive="";
            this.estudiante.estado="";
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Estudiante registrado con exito!!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error=>{
          console.log(error);
          this.status="error";
        }
      )
    }else{
      */
      //actualiza la ficha
      this.sensorService.update(this.sensor).subscribe(
        response=>{
          if(response.status=="success"){
            this.sensor=response.sensor;
            this.status="success";
            this.sensor.id=null;
            this.sensor.nombre="";
            this.sensor.estado="";
            this.sensor.caracteristica="";
            this.sensor.invernadero_id_invernadero=null;
            this.sensor.tiempo=null;
            this.sensor.minimo=null;
            this.sensor.maximo=null;
            this.getTemp();
          
          }
        },
        error=>{
          console.log(error);
          this.status="error";
        }
      )
    }
    
  }

