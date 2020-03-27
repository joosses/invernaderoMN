import { Component, OnInit } from '@angular/core';
import { Sensor } from 'src/app/modelos/Sensor';
import { SensorServiceService } from 'src/app/servicio/sensor-service.service';

import { Injectable } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})




@Component({
  selector: 'app-actuador',
  templateUrl: './actuador.component.html',
  styleUrls: ['./actuador.component.css']
})
export class ActuadorComponent implements OnInit {
  minutos: String[] = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120'];

  public temp: Sensor = { id: null, nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null, tiempo: null, minimo: null, maximo: null };
  public hum: Sensor = { id: null, nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null, tiempo: null, minimo: null, maximo: null };
  public humsuel: Sensor = { id: null, nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null, tiempo: null, minimo: null, maximo: null };
  public co2: Sensor = { id: null, nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null, tiempo: null, minimo: null, maximo: null };
  public inve: Invernadero = { id: null, cultivo: "", caracteristicas: "", placa: "", usuario_id_usuario: null, chipid: null, estado: null };
  public status;
  public pruebasa = 5;
  public sensorServ;
  public tempMin;
  public humMin;
  public humSuelMin;
  public co2Min;
  public tempMax;
  public contadores;
  public nombre;
  public nombreCultivo;
  public var;
  public humMax;
  public humSuelMax;
  public co2Max;
  

  nombres: String[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100'];
  public tiempoTemp: Sensor = { id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null, minimo:null,maximo:null };
  public tiempoHum: Sensor = {  id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null ,minimo:null,maximo:null};
  public tiempoHumSuel: Sensor = {  id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null, minimo:null,maximo:null};
  public tiempoCo2: Sensor = {  id: null,nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null,tiempo:null, minimo:null,maximo:null};


  constructor(public sensorServices: SensorServiceService, public invernaderoServices: InvernaderoServiceService) {
    this.nombreCultivo = this.obtenerNombre();


  }

  ngOnInit() {
    this.getTemp();
    this.getHumSuel();
    this.getHum();
    this.getCo2();

    

    this.obtenerNombre();
    this.resultado();
    
    this.getMedicionTemperaturaMin();
    this.getMedicionhumedadSueloMin();
    this.getMedicionHumedadMin();
    this.getMedicionCo2Min();

    this.getTiempoTemp();
    this.getTiempoHumedad();
    this.getTiempoHumedadSuelo();
    this.getTiempoCo2();
    
    this.mostrarTemperatura();
    this.mostrarHumedadSuelo();
    this.mostrarHumedad();
    this.mostrarCo2();

    this.getMedicionTemperaturaMax();
    this.getMedicionHumedadMax();
    this.getMedicionhumedadSueloMax();
    this.getMedicionCo2Max();
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

  /*
  cambioTemperatura(form) {
   
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
*/
  cambioTemperatura(form){
    Swal.fire({
      title: '¿Estás seguro de este tiempo?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
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
              this.getMedicionTemperaturaMin()
              this.getMedicionTemperaturaMax();
          Swal.fire(
            'Agregado!',
            'Tiempo agregado exitosamente',
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
  /*
  cambioHumedadSuelo(form) {
   
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
  */
  cambioHumedadSuelo(form){
    Swal.fire({
      title: '¿Estás seguro de este tiempo?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
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
              this.getMedicionhumedadSueloMin();
              this.getMedicionhumedadSueloMax();
          Swal.fire(
            'Agregado!',
            'Tiempo agregado exitosamente',
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
   /* 
    
    
  cambioHumedad(form) {
   
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
  */
  cambioHumedad(form){
    Swal.fire({
      title: '¿Estás seguro de este tiempo?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
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
              this.getMedicionHumedadMin();
              this.getMedicionHumedadMax();
          Swal.fire(
            'Agregado!',
            'Tiempo agregado exitosamente',
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
  /*
  cambioCo2(form) {
  
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
*/
  cambioCo2(form){
    Swal.fire({
      title: '¿Estás seguro de este tiempo?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
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
              this.getMedicionCo2Min();
              this.getMedicionCo2Max();
          Swal.fire(
            'Agregado!',
            'Tiempo agregado exitosamente',
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
  

  //la variable no devuelve indefinido ;) este metodo usar para traer cosas :D
  obtenerNombre() {
    //this.nombre=this.invernaderoServices.getNombre();
    //console.log("EL NOMBRE ES: "+this.nombre);
    // return this.nombre;
    this.invernaderoServices.getNombre().subscribe(response => {
      if (response.status == 'success') {

        this.inve = response.invernadero[0];
        console.log("NAMEEEEE" + this.inve.cultivo);

      }
    },
      err => console.log(err)
    )
    return this.inve;
  }
  resultado() {
    this.var = this.obtenerNombre();
    console.log(this.var);
  }
  mostrarTemperatura(): boolean {
    if (this.tempMin == 0) {
      return true;

    } else {
      return false;
    }
  }
  mostrarHumedadSuelo(): boolean {

    if (this.humSuelMin == 0 && this.tempMin > 0) {
      console.log("mostrando la humedad del suelo" + this.humSuelMin);
      return true;

    } else {
      return false;
    }
  }
  mostrarHumedad(): boolean {
    if (this.humMin == 0 && this.humSuelMin > 0) {
      return true;
    } else {
      return false;
    }
  }
  mostrarCo2(): boolean {
    if (this.co2Min == 0 && this.humMin > 0) {
      return true;
    } else {
      return false;
    }
  }
  prueba(): boolean {
    if (this.pruebasa == 1) {
      return true;
    }
    else {
      return false;
    }
  }

  getMedicionTemperaturaMin() {
    this.sensorServices.getTemperaturaMin().subscribe(response => {
      if (response.status == 'success') {

        this.tempMin = response.tiempo.minimo;

        console.log("Temperatura: " + this.tempMin);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionHumedadMin() {
    this.sensorServices.getHumedadMin().subscribe(response => {
      if (response.status == 'success') {
        this.humMin = response.tiempo.minimo;

        console.log("Humedad Min: " + this.humMin);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionhumedadSueloMin() {
    this.sensorServices.getHumedadSueloMin().subscribe(response => {
      if (response.status == 'success') {

        this.humSuelMin = response.tiempo.minimo;

        console.log("Humedad Suelo Min: " + this.humSuelMin);
      }
    },
      err => console.log(err)
    )
  }
  getMedicionCo2Min() {
    this.sensorServices.getCo2Min().subscribe(response => {
      if (response.status == 'success') {

        this.co2Min = response.tiempo.minimo;

        console.log("Co2 Min: " + this.co2Min);
      }
    },
      err => console.log(err)
    )
  }



  /**
   * onSubmit crea o actualiza un modelo según el this.modelo
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar modelo)
   */

  getTemp() {
    this.sensorServices.getTemperaturaMin().subscribe(response => {
      if (response.status == 'success') {

        this.temp = response.tiempo;

        console.log(this.temp);
      }
    },
      err => console.log(err)
    )
  }

  onSubmitTemperatura(form){
    Swal.fire({
      title: '¿Esta seguro de registar estos limites?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
        this.sensorServices.update(this.temp).subscribe(
          response => {
            if (response.status == "success") {
              this.temp = response.sensor;
              // console.log("Que es esto: "+ response.sensor);
              this.status = "success";
              this.temp.id = null;
              this.temp.nombre = "";
              this.temp.estado = "";
              this.temp.caracteristica = "";
              this.temp.invernadero_id_invernadero = null;
              this.temp.tiempo = null;
              this.temp.minimo = null;
              this.temp.maximo = null;
              this.getTemp();
    
             
    
    
          Swal.fire(
            'Agregado!',
            'Limites establecidos',
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



/*
  onSubmitTemperatura(form) {
  
    //actualiza la ficha
    this.sensorServices.update(this.temp).subscribe(
      response => {
        if (response.status == "success") {
          this.temp = response.sensor;
          // console.log("Que es esto: "+ response.sensor);
          this.status = "success";
          this.temp.id = null;
          this.temp.nombre = "";
          this.temp.estado = "";
          this.temp.caracteristica = "";
          this.temp.invernadero_id_invernadero = null;
          this.temp.tiempo = null;
          this.temp.minimo = null;
          this.temp.maximo = null;
          this.getTemp();

          location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
*/
  getHumSuel() {
    this.sensorServices.getHumedadSueloMin().subscribe(response => {
      if (response.status == 'success') {

        this.humsuel = response.tiempo;

        console.log(this.humsuel);
      }
    },
      err => console.log(err)
    )
  }
/*
  onSubmitHumedadSuelo(form) {
    
    //actualiza la ficha
    this.sensorServices.update(this.humsuel).subscribe(
      response => {
        if (response.status == "success") {
          this.humsuel = response.sensor;
          this.status = "success";
          this.humsuel.id = null;
          this.humsuel.nombre = "";
          this.humsuel.estado = "";
          this.humsuel.caracteristica = "";
          this.humsuel.invernadero_id_invernadero = null;
          this.humsuel.tiempo = null;
          this.humsuel.minimo = null;
          this.humsuel.maximo = null;
          this.getHumSuel();
          location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
*/
  onSubmitHumedadSuelo(form){
    Swal.fire({
      title: '¿Esta seguro de registar estos limites?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
        this.sensorServices.update(this.humsuel).subscribe(
          response => {
            if (response.status == "success") {
              this.humsuel = response.sensor;
              this.status = "success";
              this.humsuel.id = null;
              this.humsuel.nombre = "";
              this.humsuel.estado = "";
              this.humsuel.caracteristica = "";
              this.humsuel.invernadero_id_invernadero = null;
              this.humsuel.tiempo = null;
              this.humsuel.minimo = null;
              this.humsuel.maximo = null;
              this.getHumSuel();
            
    
    
          Swal.fire(
            'Agregado!',
            'Limites establecidos',
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

  getHum() {
    this.sensorServices.getHumedadMin().subscribe(response => {
      if (response.status == 'success') {

        this.hum = response.tiempo;

        console.log(this.hum);
      }
    },
      err => console.log(err)
    )
  }
/*
  onSubmitHumedad(form) {
    
    //actualiza la ficha
    this.sensorServices.update(this.hum).subscribe(
      response => {
        if (response.status == "success") {
          this.hum = response.sensor;
          this.status = "success";
          this.hum.id = null;
          this.hum.nombre = "";
          this.hum.estado = "";
          this.hum.caracteristica = "";
          this.hum.invernadero_id_invernadero = null;
          this.hum.tiempo = null;
          this.hum.minimo = null;
          this.hum.maximo = null;
          this.getHum();
          location.reload();


        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
*/
  onSubmitHumedad(form){
    Swal.fire({
      title: '¿Esta seguro de registar estos limites?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
        this.sensorServices.update(this.hum).subscribe(
          response => {
            if (response.status == "success") {
              this.hum = response.sensor;
              this.status = "success";
              this.hum.id = null;
              this.hum.nombre = "";
              this.hum.estado = "";
              this.hum.caracteristica = "";
              this.hum.invernadero_id_invernadero = null;
              this.hum.tiempo = null;
              this.hum.minimo = null;
              this.hum.maximo = null;
              this.getHum();
            
    
    
          Swal.fire(
            'Agregado!',
            'Limites establecidos',
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




  getCo2() {
    this.sensorServices.getCo2Min().subscribe(response => {
      if (response.status == 'success') {
        this.co2 = response.tiempo;
        console.log(this.co2);
      }
    },
      err => console.log(err)
    )
  }
/*
  onSubmitCo2(form) {
    
    //actualiza la ficha
    this.sensorServices.update(this.co2).subscribe(
      response => {
        if (response.status == "success") {
          this.co2 = response.sensor;
          this.status = "success";
          this.co2.id = null;
          this.co2.nombre = "";
          this.co2.estado = "";
          this.co2.caracteristica = "";
          this.co2.invernadero_id_invernadero = null;
          this.co2.tiempo = null;
          this.co2.minimo = null;
          this.co2.maximo = null;
          this.getCo2();
          location.reload();

        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    )
  }
*/

  onSubmitCo2(form){
    Swal.fire({
      title: '¿Esta seguro de registar estos limites?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.value) {   
        console.log("Vamos Bien");
        this.sensorServices.update(this.co2).subscribe(
          response => {
            if (response.status == "success") {
              this.co2 = response.sensor;
              this.status = "success";
              this.co2.id = null;
              this.co2.nombre = "";
              this.co2.estado = "";
              this.co2.caracteristica = "";
              this.co2.invernadero_id_invernadero = null;
              this.co2.tiempo = null;
              this.co2.minimo = null;
              this.co2.maximo = null;
              this.getCo2();
              
    
    
          Swal.fire(
            'Agregado!',
            'Limites establecidos',
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


}