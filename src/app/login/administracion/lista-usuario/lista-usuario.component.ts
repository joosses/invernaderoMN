import { Component, OnInit } from '@angular/core';
import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';
import Swal from 'sweetalert2';
import { Invernadero } from 'src/app/modelos/Invernadero';
import { Usuario } from 'src/app/modelos/Usuario';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  public usuario;
  public activarModal:string='';
  //usuario: any;
  usuarioNombre: any;
  usuarioId: any;

  public usu: Usuario = { id: null, nombre: "", apellido: "", telefono:null, direccion: "", ciudad: null, correo:"",contrasena:"",rol:null};
  status: string;

  constructor(public invernaderoService: InvernaderoServiceService, public _usuarioService:UsuarioServiceService) { }

  ngOnInit() {
    this.getusuario();
  }
  getusuario() {
    
    this._usuarioService.getUsuario().subscribe( response => {
      if (response.status == 'success') {
    }
        this.usuario = response.usuario;
          console.log("Los usuarios!!! : " + this.usuario);      
    },
      err => console.log(err)
    )
  }
  /*
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
  */
  mix(){
    this
  }
  mostrarModal(id?,nombre?,apellido?,telefono?,direccion?, ciudad?,correo?,rol? ){
    this.activarModal='block';
    if(id){
      this.usu.id=id;
      this.usu.nombre=nombre;
      this.usu.apellido=apellido;
      this.usu.telefono=telefono;
      this.usu.direccion=direccion;
      this.usu.ciudad=ciudad;
      this.usu.correo=correo;
      this.usu.rol=rol;
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.usu.id=null;
    this.usu.nombre="";
    this.usu.apellido="";
    this.usu.telefono="";
    this.usu.direccion="";
    this.usu.ciudad="";
    this.usu.correo="";
    this.usu.rol=null;
   
  }

  onSubmit(form){
    if(this.usu.id==null){
      //crear un modelo
      this.usu.id=this._usuarioService.identity.sub;
      this._usuarioService.register(this.usu).subscribe(
        response=>{
          if(response.status=="success"){
            this.usu=response.usuario;
            this.status="success";
            this.getusuario();
            this.activarModal='';
            this.usu.id=null;
            this.usu.nombre="";
            this.usu.apellido="";
            this.ocultarModal();
            form.reset();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Usuario agregado correctamente',
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
      //actualiza el usuario
      this._usuarioService.update(this.usu).subscribe(
        response=>{
          if(response.status=="success"){
            this.usu=response.usuario;
            this.status="success";
            this.getusuario();
            this.activarModal='';
            this.usu.id=null;
            this.usu.nombre="";
            this.usu.apellido="";
            this.usu.telefono="";
            this.usu.direccion="";
            this.usu.ciudad="";
            this.usu.correo="";
            
            this.usu.rol=null;
         
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Cambios realizados correctamente',
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


  eliminarUsuario(id,nombre){
    console.log("El id es:"+ id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'  
      },
      buttonsStyling: true,
    })
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: "Esto no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._usuarioService.deleteUsuario(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              this.usu = response.usuario;
              this.status = "success";
              this.usu.id = null;
    
              this.usu.nombre = "";
              this.usu.apellido = "";
              this.usu.telefono = "";
              this.usu.direccion = null;
              this.usu.ciudad="";
              this.usu.correo="";
              this.usu.rol=null;
              this.getusuario();
              swalWithBootstrapButtons.fire(
                'Usuario eliminado!',
                `Usuario ${nombre} eliminado con éxito.`,
                'success'
              )
              this.getusuario();
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



