
import { Component, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Medicion } from 'src/app/modelos/Medicion';
import { MedicionServiceService } from 'src/app/servicio/medicion-service.service';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  public var = [];
  public var1: any[];
  public cont: number;
  public temperatura = [];

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Temperatura' },

  ];
  public lineChartDataH: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Humedad' },

  ];
  public lineChartDataHS: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Humedad Suelo' },

  ];
  public lineChartDataC: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Co2' },

  ];


  public temp: Medicion = { id: null, valor: null, tiempo: null, chipid: null, nombre: null };
  constructor(public medicionService: MedicionServiceService) {
    /*this.medicionService.getgrafica().subscribe((resp:any)=>{
      this.temperatura =resp.status;
    })
    */

  }
  ngOnInit() {
    //this.obtenerNombre();
    this.medicionService.getgrafica().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;
        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartData = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Temperatura'
        },

      ];

    })
    this.medicionService.getgraficaH().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;
        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartDataH = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Humedad'
        },

      ];

    })
    this.medicionService.getgraficaHS().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;
        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartDataHS = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Humedad Suelo'
        },

      ];

    })
    this.medicionService.getgraficaC().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;
        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartDataC = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Co2'
        },

      ];

    })
    //console.log("En el init valor temperatura"+this.temperatura);
  }
  //this.var[0].valor, this.var[1].valor, this.var[2].valor, this.var[3].valor, this.var[4].valor, this.var[5].valor, this.var[6].valor
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
      doc.addImage(img, 'PNG', 1, 1, 195, 105);
      
      /*const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      */

      doc.save('Historico.pdf');
    });
  }

  public obtenerNombre() {
    //this.nombre=this.invernaderoServices.getNombre();
    //console.log("EL NOMBRE ES: "+this.nombre);
    // return this.nombre;
    this.medicionService.getgrafica().subscribe((resp: any) => {
      this.var1 = (resp.medicion);
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {

        this.temperatura[this.cont] = this.var1[index];
        this.cont = this.cont + 1;

      }
      console.log("NAMEEEEE: " + this.temperatura)
    })
    
  }

  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'green',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;




  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
