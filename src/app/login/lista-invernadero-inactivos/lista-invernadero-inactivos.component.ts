import { Component, OnInit } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-invernadero-inactivos',
  templateUrl: './lista-invernadero-inactivos.component.html',
  styleUrls: ['./lista-invernadero-inactivos.component.css']
})
export class ListaInvernaderoInactivosComponent implements OnInit {
  public invernadero;
  public activarModal:string='';
  usuario: any;
  usuarioNombre: any;
  usuarioId: any;
  public inver: Invernadero = { id: null, cultivo: "", caracteristicas: "", placa: "", usuario_id_usuario: null, chipid:null,estado:null};
  status: string;
  constructor(public invernaderoService:InvernaderoServiceService, public _usuarioService: UsuarioServiceService) { }
 
  ngOnInit() {
    this.getinvernadero();
    console.log("Estamos en los inactivos");
  }
  getinvernadero() {
    
    this.invernaderoService.getInvernaderoTabla().subscribe( response => {
      if (response.status == 'success') {


    }
   
        this.invernadero = response.invernadero;
       

          console.log("Los invernaderos!!! : " + this.invernadero.estado);
        
        
      
    },
      err => console.log(err)
    )
  }
  mostrarModal(id?,cultivo?,estado?,placa?,usuario_id_usuario?, chipid?,caracteristicas? ){
    this.activarModal='block';
    if(id){
      this.inver.id=id;
      this.inver.cultivo=cultivo;
      this.inver.estado=estado;
      this.inver.caracteristicas=caracteristicas;
      this.inver.placa=placa;
      this.inver.usuario_id_usuario=usuario_id_usuario;
      this.inver.chipid=chipid;
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.inver.id=null;
    this.inver.cultivo="";
    this.inver.estado=null;
    this.inver.caracteristicas="";
    this.inver.placa="";
    this.inver.usuario_id_usuario=null;
    this.inver.chipid=null;
  }

  onSubmit(form){
    if(this.inver.id==null){
      //crear un modelo
      this.inver.id=this._usuarioService.identity.sub;
      this.invernaderoService.register(this.inver).subscribe(
        response=>{
          if(response.status=="success"){
            this.inver=response.invernadero;
            this.status="success";
            this.getinvernadero();
            this.activarModal='';
            this.inver.id=null;
            this.inver.cultivo="";
            this.inver.estado=null;
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
      this.invernaderoService.update(this.inver).subscribe(
        response=>{
          if(response.status=="success"){
            this.inver=response.invernadero;
            this.status="success";
            this.getinvernadero();
            this.activarModal='';
            this.inver.id=null;
            this.inver.cultivo="";
            this.inver.estado=null;
         
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
    }
    
  }


  eliminarInvernadero(id,cultivo){
    console.log("El id es:"+ id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'  
      },
      buttonsStyling: true,
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.invernaderoService.deleteInvernadero(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              this.inver = response.invernadero;
              this.status = "success";
              this.inver.id = null;
    
              this.inver.cultivo = null;
              this.inver.caracteristicas = "";
              this.inver.placa = "";
              this.inver.usuario_id_usuario = null;
              this.inver.chipid=null;
              this.inver.estado=null;
              this.getinvernadero();
              swalWithBootstrapButtons.fire(
                'Invernadero eliminado!',
                `Invernadero ${cultivo} eliminado con éxito.`,
                'success'
              )
              this.getinvernadero();
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
