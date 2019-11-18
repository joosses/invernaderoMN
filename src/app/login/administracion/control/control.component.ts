import { Component, OnInit } from '@angular/core';
import {MedicionServiceService} from 'src/app/servicio/medicion-service.service';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {


  public mediciones;
  constructor(public medicionServices: MedicionServiceService){

  }
  ngOnInit(){
    this.getMedicion();
  }
  getMedicion(){
    this.medicionServices.getMedicion().subscribe(response =>{
      if(response.status =='success'){
        this.mediciones=response.medicion;
        console.log(this.mediciones);
      }
    },
      err=>console.log(err)
    )
  }
}
