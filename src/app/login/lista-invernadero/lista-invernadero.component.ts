import { Component, OnInit } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import Swal from 'sweetalert2';
import { Invernadero } from 'src/app/modelos/Invernadero';
@Component({
  selector: 'app-lista-invernadero',
  templateUrl: './lista-invernadero.component.html',
  styleUrls: ['./lista-invernadero.component.css']
})
export class ListaInvernaderoComponent implements OnInit {
  public invernadero;
  usuario: any;
  usuarioNombre: any;
  usuarioId: any;
  public inver: Invernadero = { id: null, cultivo: null, caracteristicas: "", placa: null, usuario_id_usuario: null, chipid:null,estado:null};
  status: string;

  constructor( public invernaderoService: InvernaderoServiceService, public _usuarioService:UsuarioServiceService) { }

  ngOnInit() {
    this.getinvernadero();
  }

  getinvernadero() {
    
    this.invernaderoService.getInvernaderoTabla().subscribe( response => {
      if (response.status == 'success') {


    }
   
        this.invernadero = response.invernadero;
       

          console.log("Los invernaderos!!! : " + this.invernadero);
        
        
      
    },
      err => console.log(err)
    )
  }
  getUsuarioSelect() {
    this._usuarioService.getUsuario().subscribe( response => {
      if (response.status == 'success') {
        


    }
   
        this.usuario = response.usuario;
        this.usuarioNombre= response.usuario.nombre;
        this.usuarioId= response.usuario[0].id;

          console.log("Los usuarios : " + this.usuario);
        
        
      
    },
      err => console.log(err)
    )
  }
  mix(){
    this
  }


  eliminarInvernadero(){
    console.log("El id es:");
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
        this.invernaderoService.update(this.inver).subscribe(
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
                'invernadero eliminado!',
                `invernadero  eliminado con éxito.`,
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
