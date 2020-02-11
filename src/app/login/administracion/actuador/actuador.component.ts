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
  public pruebasa=5;
public sensorServ;
  public tempMin;
  public humMin;
  public humSuelMin;
  public co2Min;
  constructor(public sensorServices:SensorServiceService) { 
    
  }

  ngOnInit() {
    this.getTemp();
    this.getHumSuel();

    this.getMedicionTemperaturaMin();
    this.getMedicionhumedadSueloMin();
    this.getMedicionHumedadMin();
    this.getMedicionCo2Min();

    this.mostrarTemperatura();
    this.mostrarHumedadSuelo();
    this.mostrarHumedad();
    this.mostrarCo2();
  }
  mostrarTemperatura():boolean {
    if(this.tempMin==0) {
      return true;
    }else {
      return false;
    }
  }
  mostrarHumedadSuelo():boolean {
    console.log("mostrando la humedad del suelo" + this.humSuelMin);
    if(this.humSuelMin==0 && this.tempMin>0) {
      return true;
    }else {
      return false;
    }
  }
  mostrarHumedad():boolean {
    if(this.humMin==0 && this.humSuelMin>0) {
      return true;
    }else {
      return false;
    }
  }
  mostrarCo2():boolean {
    if(this.co2Min==0 && this.humMin>0) {
      return true;
    }else {
      return false;
    }
  }
  prueba():boolean{
    if(this.pruebasa==1){
      return true;
    }
    else{
      return false;
    }
  }

  getMedicionTemperaturaMin() {
    this.sensorServices.getTemperaturaMin().subscribe(response =>{
      if(response.status =='success'){
        
        this.tempMin=response.tiempo.minimo;

        console.log("asdasfsdfdfasd"+this.tempMin);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionHumedadMin() {
    this.sensorServices.getHumedadMin().subscribe(response =>{
      if(response.status =='success'){
        this.humMin=response.tiempo.minimo;
        
        console.log("Humedad Min "+this.humMin);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionhumedadSueloMin() {
    this.sensorServices.getHumedadSueloMin().subscribe(response =>{
      if(response.status =='success'){
        
        this.humSuelMin=response.tiempo.minimo;

        console.log("HumedadSuelo Min "+this.humSuelMin);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionCo2Min() {
    this.sensorServices.getCo2Min().subscribe(response =>{
      if(response.status =='success'){
        
        this.co2Min=response.tiempo.minimo;

        console.log("Co2 Min "+this.co2Min);
      }
    },
      err=>console.log(err)
    )
  }

  
  
  /**
   * onSubmit crea o actualiza un modelo según el this.modelo
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar modelo)
   */

   getTemp(){
    this.sensorServices.getTemperaturaMin().subscribe(response =>{
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
      this.sensorServices.update(this.sensor).subscribe(
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

    getHumSuel(){
      this.sensorServices.getHumedadSueloMin().subscribe(response =>{
        if(response.status =='success'){
          
          this.sensor=response.tiempo;
  
          console.log(this.sensor);
        }
      },
        err=>console.log(err)
      )
     }
     
    onSubmitDos(form){
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
        this.sensorServices.update(this.sensor).subscribe(
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
              this.getHumSuel(); 
            
            }
          },
          error=>{
            console.log(error);
            this.status="error";
          }
        )
      }

    
      
  }


