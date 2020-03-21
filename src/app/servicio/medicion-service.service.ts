import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';
import { UsuarioServiceService } from './usuario-service.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset =UTF-8';
const EXCEL_EXT = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class MedicionServiceService {

  url;
  headers;
  id;

  constructor(public http:HttpClient, public usuario:UsuarioServiceService) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    this.id=this.usuario.getSub();
    

  }
  exportToExcel(json:any[], excelFileName: string):void{
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook : XLSX.WorkBook ={
        Sheets:{'data':worksheet},
        SheetNames:['data']
    
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType:'xlsx', type:'array'});
    this.saveAsExcel(excelBuffer, excelFileName);
  }
  private saveAsExcel(buffer:any, fileName:string):void{
    const data:Blob =new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data,fileName+'_export_' +new Date().getTime()+EXCEL_EXT);
  }



  //DEspues para cada sensor NICO QLO
  getMedicionTemperatura():Observable<any>{
    return this.http.get(this.url+'mediciontemperatura/'+this.id,{headers:this.headers});
  }
  getgraficaH():Observable<any>{
    return this.http.get(this.url+'graficah/'+this.id,{headers:this.headers});
  }
  getgraficaHS():Observable<any>{
    return this.http.get(this.url+'graficahs/'+this.id,{headers:this.headers});
  }
  getgraficaC():Observable<any>{
    return this.http.get(this.url+'graficac/'+this.id,{headers:this.headers});
  }
  getgrafica():Observable<any>{
    return this.http.get(this.url+'graficat/'+this.id,{headers:this.headers});
  }
  getMedicionHumedad():Observable<any>{
    return this.http.get(this.url+'medicionhumedad/'+this.id,{headers:this.headers});
  }
  getMedicionHumedadSuelo():Observable<any>{
    return this.http.get(this.url+'medicionhumedadsuelo/'+this.id,{headers:this.headers});
  }
  getMedicionCo2():Observable<any>{
    return this.http.get(this.url+'medicionco2/'+this.id,{headers:this.headers});
  }
  

}