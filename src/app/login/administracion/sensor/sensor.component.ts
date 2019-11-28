import { Component, OnInit } from '@angular/core';
import {SensorServiceService} from 'src/app/servicio/sensor-service.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  public tempMin;
  public tempMax;
  public humMin;
  public humMax;
  public humSuelMin;
  public humSuelMax;
  public co2Min;
  public co2Max;



  constructor(public sensorServices: SensorServiceService) { }

  ngOnInit() {
    this.getMedicionTemperaturaMin();
    this.getMedicionHumedadMin();
    this.getMedicionhumedadSueloMin();
    this.getMedicionCo2Min();
    this.getMedicionTemperaturaMax();
    this.getMedicionHumedadMax();
    this.getMedicionhumedadSueloMax();
    this.getMedicionCo2Max();
  }
  
  getMedicionTemperaturaMin() {
    this.sensorServices.getTemperaturaMin().subscribe(response =>{
      if(response.status =='success'){
        
        this.tempMin=response.tiempo.minimo;

        console.log("Temperatura Min "+this.tempMin);
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
  getMedicionTemperaturaMax() {
    this.sensorServices.getTemperaturaMin().subscribe(response =>{
      if(response.status =='success'){
        
        this.tempMax=response.tiempo.maximo;

        console.log("Temperatura Max "+this.tempMax);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionHumedadMax() {
    this.sensorServices.getHumedadMin().subscribe(response =>{
      if(response.status =='success'){
        this.humMax=response.tiempo.maximo;
        
        console.log("Humedad Max"+this.humMax);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionhumedadSueloMax() {
    this.sensorServices.getHumedadSueloMin().subscribe(response =>{
      if(response.status =='success'){
        
        this.humSuelMax=response.tiempo.maximo;

        console.log("HumedadSuelo Max"+this.humSuelMax);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionCo2Max() {
    this.sensorServices.getCo2Min().subscribe(response =>{
      if(response.status =='success'){
        
        this.co2Max=response.tiempo.maximo;

        console.log("Co2 Max"+this.co2Max);
      }
    },
      err=>console.log(err)
    )
  }
}
