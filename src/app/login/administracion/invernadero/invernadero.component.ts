import { Component, OnInit } from '@angular/core';

import { InvernaderoServiceService } from 'src/app/servicio/invernadero-service.service';
import { Invernadero } from 'src/app/modelos/Invernadero';

@Component({
  selector: 'app-invernadero',
  templateUrl: './invernadero.component.html',
  styleUrls: ['./invernadero.component.css']
})
export class InvernaderoComponent implements OnInit {

  public invernadero: Invernadero;
  public status: String;

  public datos;
 

  constructor(public invernaderoService: InvernaderoServiceService) {
    this.invernadero = new Invernadero(null, '', '', '', null, null);
  }
  /*
  id:number;
    cultivo:String;
    caracteristicas:String;
    placa: String;
    usuario_id_usuario:number;
    chipid:number;
  */

  ngOnInit() {
    this.getTodosInvernaderos();
    console.log(this.datos);
  }

  onSubmit(form) {
    console.log(this.invernadero);
    this.invernaderoService.register(this.invernadero).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          form.reset();
        }
        else {
          this.status = 'error';

        }

        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    )

  }
  
  getTodosInvernaderos():String{
    
		
    this.invernaderoService.getInvernaderos().subscribe(response =>{
      if(response.status =='success'){
        this.datos=JSON.parse(response.invernadero);
        
        
        
        console.log("traemos los invernaderos");
        console.log(this.datos);
      }
    },
      err=>console.log(err)
    )
    return this.datos;

  }
  
 /*
 private retrieveJson() {
	this.invernaderoService.myServiceMethod().subscribe(
		jsonObject => this.jsonObject = jsonObject
	);
}*/
}
