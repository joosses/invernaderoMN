import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {SensorServiceService} from 'src/app/servicio/sensor-service.service';
import { Sensor } from 'src/app/modelos/Sensor';
@Injectable({
  providedIn: 'root'
})

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
  public status;

  minutos: String[] = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120'];
  public tiempoTemp: Sensor = { id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null, minimo:null,maximo:null };
  public tiempoHum: Sensor = {  id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null ,minimo:null,maximo:null};
  public tiempoHumSuel: Sensor = {  id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null, minimo:null,maximo:null};
  public tiempoCo2: Sensor = {  id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null, minimo:null,maximo:null};


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
    this.getTiempoTemp();
    this.getTiempoHumedad();
    this.getTiempoHumedadSuelo();
    this.getTiempoCo2();

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

  // para configurar las variables de tiempo
  getTiempoTemp() {
    this.sensorServices.getTemperaturaMin().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoTemp = response.tiempo;

        console.log("tiempo sensor Temperatura: " + this.tiempoTemp.tiempo);
      }
    },
      err => console.log(err)
    )
  }
  cambioTemperatura(form) {
    /* 
    
      */
    //actualiza la ficha
    this.sensorServices.update(this.tiempoTemp).subscribe(
      response => {
        if (response.status == "success") {
          this.tiempoTemp = response.sensor;
          this.status = "success";
          this.tiempoTemp.id = null;
          this.tiempoTemp.nombre = "";
          this.tiempoTemp.estado = "";
          this.tiempoTemp.caracteristica = "";
          this.tiempoTemp.invernadero_id_invernadero = null;
          this.tiempoTemp.tiempo = null;
          this.tiempoTemp.minimo = null;
          this.tiempoTemp.maximo = null;

          this.getTiempoTemp();
          //location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
  

  getTiempoHumedadSuelo() {
    this.sensorServices.getHumedadSueloMin().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoHumSuel = response.tiempo;

        console.log("tiempo sensor Humedad Suelo: " + this.tiempoHumSuel.tiempo);
      }
    },
      err => console.log(err)
    )
  }
  cambioHumedadSuelo(form) {
    /* 
    
      */
    //actualiza la ficha
    this.sensorServices.update(this.tiempoHumSuel).subscribe(
      response => {
        if (response.status == "success") {
          this.tiempoHumSuel = response.sensor;
          this.status = "success";
          this.tiempoHumSuel.id = null;
          this.tiempoHumSuel.nombre = "";
          this.tiempoHumSuel.estado = "";
          this.tiempoHumSuel.caracteristica = "";
          this.tiempoHumSuel.invernadero_id_invernadero = null;
          this.tiempoHumSuel.tiempo = null;
          this.tiempoHumSuel.minimo = null;
          this.tiempoHumSuel.maximo = null;

          this.getTiempoHumedadSuelo();
          //location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }

  


  getTiempoHumedad() {
    this.sensorServices.getHumedadMin().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoHum = response.tiempo;

        console.log("tiempo sensor Humedad: " + this.tiempoHum.tiempo);
      }
    },
      err => console.log(err)
    )
  }
  cambioHumedad(form) {
    /* 
    
      */
    //actualiza la ficha
    this.sensorServices.update(this.tiempoHum).subscribe(
      response => {
        if (response.status == "success") {
          this.tiempoHum = response.sensor;
          this.status = "success";
          this.tiempoHum.id = null;
          this.tiempoHum.nombre = "";
          this.tiempoHum.estado = "";
          this.tiempoHum.caracteristica = "";
          this.tiempoHum.invernadero_id_invernadero = null;
          this.tiempoHum.tiempo = null;
          this.tiempoHum.minimo = null;
          this.tiempoHum.maximo = null;

          this.getTiempoHumedad();
          //location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
  
  getTiempoCo2() {
    this.sensorServices.getCo2Min().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoCo2 = response.tiempo;

        console.log("tiempo sensor Co2: " + this.tiempoCo2.tiempo);
      }
    },
      err => console.log(err)
    )
  }
  cambioCo2(form) {
    /* 
    
      */
    //actualiza la ficha
    this.sensorServices.update(this.tiempoCo2).subscribe(
      response => {
        if (response.status == "success") {
          this.tiempoCo2 = response.sensor;
          this.status = "success";
          this.tiempoCo2.id = null;
          this.tiempoCo2.nombre = "";
          this.tiempoCo2.estado = "";
          this.tiempoCo2.caracteristica = "";
          this.tiempoCo2.invernadero_id_invernadero = null;
          this.tiempoCo2.tiempo = null;
          this.tiempoCo2.minimo = null;
          this.tiempoCo2.maximo = null;

          this.getTiempoCo2();
          //location.reload();

        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
  
}
