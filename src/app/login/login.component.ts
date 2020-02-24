import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Usuario } from '../modelos/Usuario';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioServiceService]
})
export class LoginComponent implements OnInit {

  public page_titulo: string;
  public usuario: Usuario;
  public status: string;
  public token;
  public identity;


  constructor(private _usuarioServicio: UsuarioServiceService, private _router:Router, private _route: ActivatedRoute) {
    this.page_titulo = 'Iniciar Sesion';
    this.usuario = new Usuario(null, '','','','', '', '', '');
  }

  ngOnInit() {
    //se ejecuta siempre y cierra solo cuando le llega el parametro sure por url
    this.logout();
  }
  onSubmit(form) {

    this._usuarioServicio.signup(this.usuario).subscribe(
      response => {
        //TOKEN
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          //OBJETO USUARIO IDENTIFICADO
          this._usuarioServicio.signup(this.usuario, true).subscribe(
            response => {
              this.identity = response;

              //PERSISTIR DATOS USUARIO IDENTIFICADO
              console.log(this.token);
              console.log(this.identity);
              
              
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              //redireccion a la pag principal
              this._router.navigate(['admin']);
            }
          )
        }

        else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }
  logout(){
    this._route.params.subscribe(params=>{
      let logout = +params['sure'];

      if(logout== 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity =null;
          this.token =null;

          //redireccion a la pag principal
        
          this._router.navigate(['']);
      }
    });
  }

}
