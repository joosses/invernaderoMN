import { Component, OnInit } from '@angular/core';
import { MedicionServiceService } from 'src/app/servicio/medicion-service.service';
import { SensorServiceService } from 'src/app/servicio/sensor-service.service';
import { ActuadorServiceService } from 'src/app/servicio/actuador-service.service';
import { Sensor } from 'src/app/modelos/Sensor';
import { Actuador } from 'src/app/modelos/Actuador';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  public tiempoTemp: Actuador = { id: null, estado: null, nombre: "", caracteristica: "", invernadero_id_invernadero: null };
  public tiempoHum: Actuador = { id: null, estado: null, nombre: "", caracteristica: "", invernadero_id_invernadero: null };
  public tiempoHumSuel: Actuador = { id: null, estado: null, nombre: "", caracteristica: "", invernadero_id_invernadero: null };
  public tiempoCo2: Actuador = { id: null, estado: null, nombre: "", caracteristica: "", invernadero_id_invernadero: null };

  nombres: String[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70'];
  cero: String[] = ['0'];

  public status;
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

  public tTemp;

  public var;

  colorVerdeTemperatura(): boolean {
    if ((this.valorTemperatura >= (this.tempMin + 5) && this.valorTemperatura <= (this.tempMax - 5))) {
      return true;
    } else {
      return false;
    }
  }
  colorRojoTemperatura(): boolean {
    if ((this.valorTemperatura > this.tempMax || this.valorTemperatura < this.tempMin)) {
      return true;
    } else {
      return false;
    }
  }
  colorNaranjoTemperatura(): boolean {
    if ((this.valorTemperatura >= this.tempMin && this.valorTemperatura < (this.tempMin + 5) || this.valorTemperatura <= this.tempMax && this.valorTemperatura > (this.tempMax - 5))) {
      return true;
    } else {
      return false;
    }
  }

  colorVerdeHumedadSuelo(): boolean {
    if ((this.valorHumedadSuelo >= (this.humSuelMin + 5) && this.valorHumedadSuelo <= (this.humSuelMax - 5))) {
      return true;
    } else {
      return false;
    }
  }
  colorRojoHumedadSuelo(): boolean {
    if ((this.valorHumedadSuelo < this.humSuelMin || this.valorHumedadSuelo > this.humSuelMax)) {
      return true;
    } else {
      return false;
    }
  }
  colorNaranjoHumedadSuelo(): boolean {
    if ((this.valorHumedadSuelo >= this.humSuelMin && this.valorHumedadSuelo < (this.humSuelMin + 5) || this.valorHumedadSuelo > (this.humSuelMax - 5) && this.valorHumedadSuelo <= this.humSuelMax)) {
      return true;
    } else {
      return false;
    }
  }

  colorVerdeHumedad(): boolean {
    if ((this.valorHumedad >= (this.humMin + 5) && this.valorHumedad <= (this.humMax - 5))) {
      return true;
    } else {
      return false;
    }
  }
  colorRojoHumedad(): boolean {
    if ((this.valorHumedad < this.humMin || this.valorHumedad > this.humMax)) {
      return true;
    } else {
      return false;
    }
  }
  colorNaranjoHumedad(): boolean {
    if ((this.valorHumedad >= this.humMin && this.valorHumedad < (this.humMin + 5) || this.valorHumedad > (this.humMax - 5) && this.valorHumedad <= this.humMax)) {
      return true;
    } else {
      return false;
    }
  }

  colorVerdeCo2(): boolean {
    if ((this.valorCo2 >= (this.co2Min + 5) && this.valorCo2 <= (this.co2Max - 5))) {
      return true;
    } else {
      return false;
    }
  }
  colorRojoCo2(): boolean {
    if ((this.valorCo2 < this.co2Min || this.valorCo2 > this.co2Max)) {
      return true;
    } else {
      return false;
    }
  }
  colorNaranjoCo2(): boolean {
    if ((this.valorCo2 >= this.co2Min && this.valorCo2 < (this.co2Min + 5) || this.valorCo2 > (this.co2Max - 5) && this.valorCo2 <= this.co2Max)) {
      return true;
    } else {
      return false;
    }
  }

  constructor(public medicionServices: MedicionServiceService, public sensorServices: SensorServiceService, public actuadorServices: ActuadorServiceService) {

  }

  ngOnInit() {
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

    this.getTiempoTemp();
    this.getTiempoAgua();
    this.getTiempoVentilador();
    this.getTiempoVentilador2();


  }

  getMedicionCo2() {
    this.medicionServices.getMedicionCo2().subscribe(response => {
      if (response.status == 'success') {
        this.medicionesCo2 = response.medicion;
        this.valorCo2 = this.medicionesCo2.valor;
        console.log("Co2" + this.valorCo2);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionHumedadSuelo() {
    this.medicionServices.getMedicionHumedadSuelo().subscribe(response => {
      if (response.status == 'success') {
        this.medicionesHumedadSuelo = response.medicion;
        this.valorHumedadSuelo = this.medicionesHumedadSuelo.valor;
        console.log("HumedadSuelo " + this.valorHumedadSuelo);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionHumedad() {
    this.medicionServices.getMedicionHumedad().subscribe(response => {
      if (response.status == 'success') {
        this.medicionesHumedad = response.medicion;
        this.valorHumedad = this.medicionesHumedad.valor;
        console.log("Humedad " + this.valorHumedad);
      }
    },
      err => console.log(err)
    )
  }

  getMedicionTemperatura() {
    this.medicionServices.getMedicionTemperatura().subscribe(response => {
      if (response.status == 'success') {
        this.medicionesTemperatura = response.medicion;
        this.valorTemperatura = this.medicionesTemperatura.valor;
        console.log("Estamos Aqui");
        console.log(this.medicionesTemperatura['valor']);
      }
    },
      err => console.log(err)
    )
  }

  getMedicionTemperaturaMin() {
    this.sensorServices.getTemperaturaMin().subscribe(response => {
      if (response.status == 'success') {

        this.tempMin = response.tiempo.minimo;

        console.log("Temperatura Min " + this.tempMin);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionHumedadMin() {
    this.sensorServices.getHumedadMin().subscribe(response => {
      if (response.status == 'success') {
        this.humMin = response.tiempo.minimo;

        console.log("Humedad Min " + this.humMin);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionhumedadSueloMin() {
    this.sensorServices.getHumedadSueloMin().subscribe(response => {
      if (response.status == 'success') {

        this.humSuelMin = response.tiempo.minimo;

        console.log("HumedadSuelo Min " + this.humSuelMin);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionCo2Min() {
    this.sensorServices.getCo2Min().subscribe(response => {
      if (response.status == 'success') {

        this.co2Min = response.tiempo.minimo;

        console.log("Co2 Min " + this.co2Min);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionTemperaturaMax() {
    this.sensorServices.getTemperaturaMin().subscribe(response => {
      if (response.status == 'success') {

        this.tempMax = response.tiempo.maximo;

        console.log("Temperatura Max " + this.tempMax);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionHumedadMax() {
    this.sensorServices.getHumedadMin().subscribe(response => {
      if (response.status == 'success') {
        this.humMax = response.tiempo.maximo;

        console.log("Humedad Max" + this.humMax);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionhumedadSueloMax() {
    this.sensorServices.getHumedadSueloMin().subscribe(response => {
      if (response.status == 'success') {

        this.humSuelMax = response.tiempo.maximo;

        console.log("HumedadSuelo Max" + this.humSuelMax);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionCo2Max() {
    this.sensorServices.getCo2Min().subscribe(response => {
      if (response.status == 'success') {

        this.co2Max = response.tiempo.maximo;

        console.log("Co2 Max" + this.co2Max);
      }
    },
      err => console.log(err)
    )
  }


  getTiempoTemp() {
    this.actuadorServices.getLuzActual().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoTemp = response.tiempo[0];

        console.log("tiempo actudor luz: " + this.tiempoTemp.estado);
      }
    },
      err => console.log(err)
    )
  }
  prenderluz(form){
    Swal.fire({
      title: '¿Desea activar la luz?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
        this.actuadorServices.update(this.tiempoTemp).subscribe(
          response => {
            if (response.status == "success") {
              this.tiempoTemp = response.actuador;
              this.status = "success";
              this.tiempoTemp.id = null;
    
              this.tiempoTemp.estado = null;
              this.tiempoTemp.nombre = "";
              this.tiempoTemp.caracteristica = "";
              this.tiempoTemp.invernadero_id_invernadero = null;
    
              this.getTiempoTemp();
          Swal.fire(
            'Activado',
            'La luz está prendida',
            'success'
          )
        }
        else{
          this.status='error';
          
        }
        
      
      },
      error =>{
        console.log(<any>error);
      }
    )
       
      }
    })
    
    
  }

  apagarluz(form) {
    /* 
    
      */
    //actualiza la ficha

    this.actuadorServices.updatedos(this.tiempoTemp).subscribe(
      response => {

        if (response.status == "success") {
          this.tiempoTemp = response.actuador;
          this.status = "success";
          this.tiempoTemp.id = null;

          this.tiempoTemp.estado = null;
          this.tiempoTemp.nombre = "";
          this.tiempoTemp.caracteristica = "";
          this.tiempoTemp.invernadero_id_invernadero = null;

          this.getTiempoTemp();
          //location.reload();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Luz Apgada ',
            showConfirmButton: false,
            timer: 1500
          })


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }

  getTiempoAgua() {
    this.actuadorServices.getAguaActual().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoHumSuel = response.tiempo[0];

        console.log("tiempo actudor agua: " + this.tiempoHumSuel.estado);
      }
    },
      err => console.log(err)
    )
  }
  /*
  prenderagua(form) {
    
    //actualiza la ficha
    this.actuadorServices.update(this.tiempoHumSuel).subscribe(
      response => {
        if (response.status == "success") {
          this.tiempoHumSuel = response.actuador;
          this.status = "success";
          this.tiempoHumSuel.id = null;

          this.tiempoHumSuel.estado = null;
          this.tiempoHumSuel.nombre = "";
          this.tiempoHumSuel.caracteristica = "";
          this.tiempoHumSuel.invernadero_id_invernadero = null;

          this.getTiempoAgua();
          //location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
*/

  prenderagua(form){
    Swal.fire({
      title: '¿Desea activar el sistema de regadio?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
        this.actuadorServices.update(this.tiempoHumSuel).subscribe(
          response => {
            if (response.status == "success") {
              this.tiempoHumSuel = response.actuador;
              this.status = "success";
              this.tiempoHumSuel.id = null;
    
              this.tiempoHumSuel.estado = null;
              this.tiempoHumSuel.nombre = "";
              this.tiempoHumSuel.caracteristica = "";
              this.tiempoHumSuel.invernadero_id_invernadero = null;
    
              this.getTiempoAgua();
          Swal.fire(
            'Activado',
            'El sistema de regadio esta prendido',
            'success'
          )
        }
        else{
          this.status='error';
          
        }
        
      
      },
      error =>{
        console.log(<any>error);
      }
    )
       
      }
    })
    
    
  }





  apagaragua(form) {
    /* 
    
      */
    //actualiza la ficha

    this.actuadorServices.updatedos(this.tiempoHumSuel).subscribe(
      response => {

        if (response.status == "success") {
          this.tiempoHumSuel = response.actuador;
          this.status = "success";
          this.tiempoHumSuel.id = null;

          this.tiempoHumSuel.estado = null;
          this.tiempoHumSuel.nombre = "";
          this.tiempoHumSuel.caracteristica = "";
          this.tiempoHumSuel.invernadero_id_invernadero = null;

          this.getTiempoAgua();
          //location.reload();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sistema de regadio apagado',
            showConfirmButton: false,
            timer: 1500
          })


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }


  getTiempoVentilador() {
    this.actuadorServices.getExtractorActual().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoHum = response.tiempo[0];

        console.log("tiempo actudor ventilador: " + this.tiempoHum.estado);
      }
    },
      err => console.log(err)
    )
  }
  /*
  prenderventilador(form) {
  
    //actualiza la ficha
    this.actuadorServices.update(this.tiempoHum).subscribe(
      response => {
        if (response.status == "success") {
          this.tiempoHum = response.actuador;
          this.status = "success";
          this.tiempoHum.id = null;

          this.tiempoHum.estado = null;
          this.tiempoHum.nombre = "";
          this.tiempoHum.caracteristica = "";
          this.tiempoHum.invernadero_id_invernadero = null;

          this.getTiempoVentilador();
          //location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
*/
  prenderventilador(form){
    Swal.fire({
      title: '¿Desea activar el ventilador?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
        this.actuadorServices.update(this.tiempoHum).subscribe(
          response => {
            if (response.status == "success") {
              this.tiempoHum = response.actuador;
              this.status = "success";
              this.tiempoHum.id = null;
    
              this.tiempoHum.estado = null;
              this.tiempoHum.nombre = "";
              this.tiempoHum.caracteristica = "";
              this.tiempoHum.invernadero_id_invernadero = null;
    
              this.getTiempoVentilador();
          Swal.fire(
            'Activado',
            'El ventilador está prendido',
            'success'
          )
        }
        else{
          this.status='error';
          
        }
        
      
      },
      error =>{
        console.log(<any>error);
      }
    )
       
      }
    })
    
    
  }





  apagarventilador(form) {
    /* 
    
      */
    //actualiza la ficha

    this.actuadorServices.updatedos(this.tiempoHum).subscribe(
      response => {

        if (response.status == "success") {
          this.tiempoHum = response.actuador;
          this.status = "success";
          this.tiempoHum.id = null;

          this.tiempoHum.estado = null;
          this.tiempoHum.nombre = "";
          this.tiempoHum.caracteristica = "";
          this.tiempoHum.invernadero_id_invernadero = null;

          this.getTiempoVentilador();
          //location.reload();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ventilador apagado',
            showConfirmButton: false,
            timer: 1500
          })


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
  getTiempoVentilador2() {
    this.actuadorServices.getExtractorActual2().subscribe(response => {
      if (response.status == 'success') {

        this.tiempoCo2 = response.tiempo[0];

        console.log("tiempo actuador ventilador: " + this.tiempoCo2.estado);
      }
    },
      err => console.log(err)
    )
  }
  /*
  prenderventilador2(form) {
    
    
     
    //actualiza la ficha
    this.actuadorServices.update(this.tiempoCo2).subscribe(
      response => {
        if (response.status == "success") {
          this.tiempoCo2 = response.actuador;
          this.status = "success";
          this.tiempoCo2.id = null;

          this.tiempoCo2.estado = null;
          this.tiempoCo2.nombre = "";
          this.tiempoCo2.caracteristica = "";
          this.tiempoCo2.invernadero_id_invernadero = null;

          this.getTiempoVentilador2();
          //location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
*/


prenderventilador2(form){
  Swal.fire({
    title: '¿Desea activar el segundo ventilador?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText:'Cancelar'

  }).then((result) => {
    if (result.value) {   
      console.log("Vamos Bien");
      this.actuadorServices.update(this.tiempoCo2).subscribe(
        response => {
          if (response.status == "success") {
            this.tiempoCo2 = response.actuador;
            this.status = "success";
            this.tiempoCo2.id = null;
  
            this.tiempoCo2.estado = null;
            this.tiempoCo2.nombre = "";
            this.tiempoCo2.caracteristica = "";
            this.tiempoCo2.invernadero_id_invernadero = null;
  
            this.getTiempoVentilador2();
        Swal.fire(
          'Activado',
          'El segundo ventilador está prendido',
          'success'
        )
      }
      else{
        this.status='error';
        
      }
      
    
    },
    error =>{
      console.log(<any>error);
    }
  )
     
    }
  })
  
  
}








  apagarventilador2(form) {
    /* 
    
      */
    //actualiza la ficha

    this.actuadorServices.updatedos(this.tiempoCo2).subscribe(
      response => {

        if (response.status == "success") {
          this.tiempoCo2 = response.actuador;
          this.status = "success";
          this.tiempoCo2.id = null;

          this.tiempoCo2.estado = null;
          this.tiempoCo2.nombre = "";
          this.tiempoCo2.caracteristica = "";
          this.tiempoCo2.invernadero_id_invernadero = null;

          this.getTiempoVentilador2();
          //location.reload();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Segundo ventilador apagado ',
            showConfirmButton: false,
            timer: 1500
          })

        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }


}