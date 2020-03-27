import { Component, OnInit } from '@angular/core';
import { SensorServiceService } from 'src/app/servicio/sensor-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import { Sensor } from 'src/app/modelos/Sensor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-sensor',
  templateUrl: './lista-sensor.component.html',
  styleUrls: ['./lista-sensor.component.css']
})
export class ListaSensorComponent implements OnInit {
public sensor;
public senp;
public sen:Sensor = {id: null, nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null, tiempo: null, minimo:null,maximo:null};
public activarModal:String ="";
  status: string;  
constructor(public sensorService:SensorServiceService , public _usuarioService:UsuarioServiceService) { }

  ngOnInit() {
    this.getSensor();
  }
  getSensor() {
    
    this.sensorService.getSensorTabla().subscribe( response => {
      if (response.status == 'success') {
        

    }
   
        this.sensor = response.sensor;
  
          console.log("Los Sensores!!! : " +  this.sensor);
        
        
      
    },
      err => console.log(err)
    )
  }

  mostrarModal(id?,estado?,nombre?,caracteristica?,invernadero_id_invernadero?,tiempo?,maximo?,minimo? ){
    this.activarModal='block';
    if(id){
      this.sen.id=id;
      this.sen.estado=estado;
      this.sen.nombre=nombre;
      this.sen.caracteristica=caracteristica;
      this.sen.invernadero_id_invernadero=invernadero_id_invernadero;
      this.sen.tiempo=tiempo;
      this.sen.maximo=maximo;
      this.sen.minimo=minimo;
   
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.sen.id=null;
    this.sen.estado=null;
    this.sen.nombre="";
    this.sen.caracteristica="";
    this.sen.invernadero_id_invernadero=null;
    this.sen.tiempo=null;
      this.sen.maximo=null;
      this.sen.minimo=null;
  }

  onSubmit(form){
    if(this.sen.id==null){
      //crear un modelo
      this.sen.id=this._usuarioService.identity.sub;
      this.sensorService.register(this.sen).subscribe(
        response=>{
          if(response.status=="success"){
            this.sen=response.sensor;
            this.status="success";
            this.getSensor();
            this.activarModal='';
            this.sen.id=null;
            this.sen.estado=null;
            this.sen.nombre="";
            this.ocultarModal();
            form.reset();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Invernadero agregado correctamente',
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
      //actualiza el campeonato
      this.sensorService.update(this.sen).subscribe(
        response=>{
          if(response.status=="success"){
            this.sen=response.sensor;
            this.status="success";
            this.getSensor();
            this.activarModal='';
            this.sen.id=null;
            this.sen.estado=null;
            this.sen.nombre=null;
            this.sen.caracteristica="";
            this.sen.maximo=null;
            this.sen.minimo=null;
            this.sen.tiempo=null;
         
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Sensor editado correctamente',
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
    }
    
  }


  eliminarSensor(id,nombre){
    console.log("El id es:"+ id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'  
      },
      buttonsStyling: true,
    })
    swalWithBootstrapButtons.fire({
      title: 'Está seguro de que desea eliminar el sensor?',
      text: "Eliminaras el sensor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.sensorService.deleteSensor(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              this.sen = response.sensor;
              this.status = "success";
              this.sen.id = null;
    
              this.sen.estado = null;
              this.sen.nombre = "";
              this.sen.caracteristica = "";
              this.sen.invernadero_id_invernadero = null;
              this.sen.tiempo=null;
              this.sen.maximo=null;
              this.sen.minimo=null;
              this.getSensor();
              swalWithBootstrapButtons.fire(
                'Sensor eliminado!',
                `Sensor ${nombre} eliminado con éxito.`,
                'success'
              )
              this.getSensor();
            }
          },
          error=>{
            console.log(error);
          }
        )
      }
    });
  }


}
