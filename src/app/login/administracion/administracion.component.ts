import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  mostrarSidebar:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  ocultarSidebar(){
    if(this.mostrarSidebar==true){
      this.mostrarSidebar=false;
    }else{
  this.mostrarSidebar=true;      
    }
  }
}
