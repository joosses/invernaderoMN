import { Component, OnInit } from '@angular/core';
import { ActuadorServiceService } from 'src/app/servicio/actuador-service.service';
import { Actuador } from 'src/app/modelos/Actuador';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-actuador',
  templateUrl: './listar-actuador.component.html',
  styleUrls: ['./listar-actuador.component.css']
})
export class ListarActuadorComponent implements OnInit {
  actuador= [];
  public actu: Actuador = { id: null, estado: null, nombre: "", caracteristica: null, invernadero_id_invernadero: null};
  public activarModal:String ="";
  status: string;
  public config;
  countAct
  constructor(public actuadorService:ActuadorServiceService, public _usuarioService:UsuarioServiceService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.countAct
    };
   }

  ngOnInit() {
    this.getActuador(); 
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  getActuador() {
    
    this.actuadorService.getIActuadorTabla().subscribe( response => {
      if (response.status == 'success') {


    }
   
        this.actuador = response.actuador;
       

          console.log("Los actuadores!!! : " +  this.actuador);
        
        
      
    },
      err => console.log(err)
    )
  }

  mostrarModal(id?,estado?,nombre?,caracteristica?,invernadero_id_invernadero? ){
    this.activarModal='block';
    if(id){
      this.actu.id=id;
      this.actu.estado=estado;
      this.actu.nombre=nombre;
      this.actu.caracteristica=caracteristica;
      this.actu.invernadero_id_invernadero=invernadero_id_invernadero;
   
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.actu.id=null;
    this.actu.estado=null;
    this.actu.nombre="";
    this.actu.caracteristica="";
    this.actu.invernadero_id_invernadero=null;
  }

  onSubmit(form){
    if(this.actu.id==null){
      //crear un modelo
      this.actu.id=this._usuarioService.identity.sub;
      this.actuadorService.register(this.actu).subscribe(
        response=>{
          if(response.status=="success"){
            this.actu=response.actuador;
            this.status="success";
            this.getActuador();
            this.activarModal='';
            this.actu.id=null;
            this.actu.estado=null;
            this.actu.nombre="";
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
      this.actuadorService.update(this.actu).subscribe(
        response=>{
          if(response.status=="success"){
            this.actu=response.actuador;
            this.status="success";
            this.getActuador();
            this.activarModal='';
            this.actu.id=null;
            this.actu.estado=null;
            this.actu.nombre=null;
         
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Actuador editado correctamente',
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


  eliminarActuador(id,nombre){
    console.log("El id es:"+ id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'  
      },
      buttonsStyling: true,
    })
    swalWithBootstrapButtons.fire({
      title: 'Está seguro de que desea eliminar el actuador?',
      text: "Eliminaras el actuador",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.actuadorService.deleteActuador(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              this.actu = response.actuador;
              this.status = "success";
              this.actu.id = null;
    
              this.actu.estado = null;
              this.actu.nombre = "";
              this.actu.caracteristica = "";
              this.actu.invernadero_id_invernadero = null;
              
              this.getActuador();
              swalWithBootstrapButtons.fire(
                'Actuador eliminado!',
                `Actudor ${nombre} eliminado con éxito.`,
                'success'
              )
              this.getActuador();
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
