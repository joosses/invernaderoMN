import { Component, OnInit } from '@angular/core';
import {MedicionServiceService} from 'src/app/servicio/medicion-service.service';


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

  colorVerdeTemperatura():boolean {
    if((this.valorTemperatura>=15 &&  this.valorTemperatura<=40) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoTemperatura():boolean {
    if((this.valorTemperatura>45 || this.valorTemperatura<10) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoTemperatura():boolean {
    if((this.valorTemperatura>=10 && this.valorTemperatura<15 || this.valorTemperatura<=45 && this.valorTemperatura>40) ) {
      return true;
    }else {
      return false;
    }
  }

  colorVerdeHumedadSuelo():boolean {
    if((this.valorHumedadSuelo>=48 &&  this.valorHumedadSuelo<=62) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoHumedadSuelo():boolean {
    if((this.valorHumedadSuelo<40 || this.valorHumedadSuelo>70 ) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoHumedadSuelo():boolean {
    if((this.valorHumedadSuelo>=40 && this.valorHumedadSuelo<48 || this.valorHumedadSuelo>62 && this.valorHumedadSuelo<=70) ) {
      return true;
    }else {
      return false;
    }
  }

  colorVerdeHumedad():boolean {
    if((this.valorHumedad>=15 &&  this.valorHumedad<=40) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoHumedad():boolean {
    if((this.valorHumedad<50 || this.valorHumedad>80  ) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoHumedad():boolean {
    if((this.valorHumedad>=50 && this.valorHumedad<55 || this.valorHumedad>75 && this.valorHumedad<=80 ) ) {
      return true;
    }else {
      return false;
    }
  }

  colorVerdeCo2():boolean {
    if((this.valorCo2>=45 &&  this.valorCo2<=70) ) {
      return true;
    }else {
      return false;
    }
  }
  colorRojoCo2():boolean {
    if((this.valorCo2<40 || this.valorCo2>75  ) ) {
      return true;
    }else {
      return false;
    }
  }
  colorNaranjoCo2():boolean {
    if((this.valorCo2>=40 && this.valorCo2<45 || this.valorCo2>70 && this.valorCo2<=75 ) ) {
      return true;
    }else {
      return false;
    }
  }

  constructor(public medicionServices: MedicionServiceService){

  }

  ngOnInit(){
    this.getMedicionTemperatura();
   
    this.getMedicionHumedad();
    this.getMedicionHumedadSuelo();
    this.getMedicionCo2();

    
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
 
   
}