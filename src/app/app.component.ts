import { Component, OnInit } from '@angular/core';
//import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
//import * as html2canvas from 'html2canvas';

import { ActuadorServiceService } from 'src/app/servicio/actuador-service.service';
import { UsuarioServiceService } from 'src/app/servicio/usuario-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invernaderoUno';
  public identity;
  public token;

  actuadores;
  constructor(public actuadorServices: ActuadorServiceService, public _usuarioService: UsuarioServiceService) {
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit() {
    this.getActuador();
  }
  getActuador() {
    this.actuadorServices.getActuador().subscribe(response => {
      if (response.status == 'success') {
        this.actuadores = response.actuador;
        console.log(this.actuadores);
      }
    },
      err => console.log(err)
    )
  }
  /*
  generarPDF() {
    html2canvas(document.getElementById('contenido'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 1
    }).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'PNG', 2, 2, 195, 105);
      doc.save('postres.pdf');
    });
  }

*/
}