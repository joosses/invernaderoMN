import { Component, OnInit } from '@angular/core';
import {MedicionServiceService} from 'src/app/servicio/medicion-service.service';
import {SensorServiceService} from 'src/app/servicio/sensor-service.service';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  public valorTemperatura;
  public valorHumedad;
  public valorHumedadSuelo;
  public valorCo2;
  public medicionesTemperatura;
  public medicionesHumedad;
  public medicionesHumedadSuelo;
  public medicionesCo2;

  public tempMin;
  public tempMax;
  public humMin;
  public humMax;
  public humSuelMin;
  public humSuelMax;
  public co2Min;
  public co2Max;

  colorVerdeTemperatura():boolean {
    if((this.valorTemperatura>=(this.tempMin+5) &&  this.valorTemperatura<=(this.tempMax-5)) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoTemperatura():boolean {
    if((this.valorTemperatura>this.tempMax || this.valorTemperatura<this.tempMin) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoTemperatura():boolean {
    if((this.valorTemperatura>=this.tempMin && this.valorTemperatura<(this.tempMin+5) || this.valorTemperatura<=this.tempMax && this.valorTemperatura>(this.tempMax-5)) ) {
      return true;
    }else {
      return false;
    }
  }

  colorVerdeHumedadSuelo():boolean {
    if((this.valorHumedadSuelo>=(this.humSuelMin+5) &&  this.valorHumedadSuelo<=(this.humSuelMax-5)) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoHumedadSuelo():boolean {
    if((this.valorHumedadSuelo<this.humSuelMin || this.valorHumedadSuelo>this.humSuelMax ) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoHumedadSuelo():boolean {
    if((this.valorHumedadSuelo>=this.humSuelMin && this.valorHumedadSuelo<(this.humSuelMin+5) || this.valorHumedadSuelo>(this.humSuelMax-5) && this.valorHumedadSuelo<=this.humSuelMax) ) {
      return true;
    }else {
      return false;
    }
  }

  colorVerdeHumedad():boolean {
    if((this.valorHumedad>=(this.humMin+5) &&  this.valorHumedad<=(this.humMax-5)) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoHumedad():boolean {
    if((this.valorHumedad<this.humMin || this.valorHumedad>this.humMax  ) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoHumedad():boolean {
    if((this.valorHumedad>=this.humMin && this.valorHumedad<(this.humMin+5) || this.valorHumedad>(this.humMax-5) && this.valorHumedad<=this.humMax  ) ) {
      return true;
    }else {
      return false;
    }
  }

  colorVerdeCo2():boolean {
    if((this.valorCo2>=(this.co2Min+5) &&  this.valorCo2<=(this.co2Max-5)) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoCo2():boolean {
    if((this.valorCo2<this.co2Min || this.valorCo2>this.co2Max  ) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoCo2():boolean {
    if((this.valorCo2>=this.co2Min && this.valorCo2<(this.co2Min+5) || this.valorCo2>(this.co2Max-5) && this.valorCo2<=this.co2Max ) ) {
      return true;
    }else {
      return false;
    }
  }

  constructor(public medicionServices: MedicionServiceService, public sensorServices: SensorServiceService){

  }

  ngOnInit(){
    this.getMedicionTemperatura();
    this.getMedicionHumedad();
    this.getMedicionHumedadSuelo();
    this.getMedicionCo2();
    this.getMedicionTemperaturaMin();
    this.getMedicionHumedadMin();
    this.getMedicionhumedadSueloMin();
    this.getMedicionCo2Min();
    this.getMedicionTemperaturaMax();
    this.getMedicionHumedadMax();
    this.getMedicionhumedadSueloMax();
    this.getMedicionCo2Max();

    
  }
  
  getMedicionCo2() {
    this.medicionServices.getMedicionCo2().subscribe(response =>{
      if(response.status =='success'){
        this.medicionesCo2=response.medicion;
        this.valorCo2 = this.medicionesCo2.valor;
        console.log("C02" + this.valorCo2);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionHumedadSuelo() {
    this.medicionServices.getMedicionHumedadSuelo().subscribe(response =>{
      if(response.status =='success'){
        this.medicionesHumedadSuelo=response.medicion;
        this.valorHumedadSuelo = this.medicionesHumedadSuelo.valor;
        console.log("HumedadSuelo "+this.valorHumedadSuelo);
      }
    },
      err=>console.log(err)
    )
  }
  getMedicionHumedad() {
    this.medicionServices.getMedicionHumedad().subscribe(response =>{
      if(response.status =='success'){
        this.medicionesHumedad=response.medicion;
        this.valorHumedad = this.medicionesHumedad.valor;
        console.log("Humedad "+this.valorHumedad);
      }
    },
      err=>console.log(err)
    )
  }

  getMedicionTemperatura() {
    this.medicionServices.getMedicionTemperatura().subscribe(response =>{
      if(response.status =='success'){
        this.medicionesTemperatura=response.medicion;
        this.valorTemperatura = this.medicionesTemperatura.valor;
        console.log("Estamos Aqui");
        console.log(this.medicionesTemperatura['valor']);
      }
    },
      err=>console.log(err)
    )
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