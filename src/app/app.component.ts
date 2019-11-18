import { Component, OnInit } from '@angular/core';

import {ActuadorServiceService} from 'src/app/servicio/actuador-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invernaderoUno';

  actuadores;
  constructor(public actuadorServices: ActuadorServiceService){

  }
  ngOnInit(){
    this.getActuador();
  }
  getActuador(){
    this.actuadorServices.getActuador().subscribe(response =>{
      if(response.status =='success'){
        this.actuadores=response.actuador;
        console.log(this.actuadores);
      }
    },
      err=>console.log(err)
    )
  }
}
