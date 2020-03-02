export class Sensor{
    
    constructor(
    public id:number,
    public nombre:String,
    public estado:String,
    public caracteristica:String,
    public invernadero_id_invernadero:number,
    public tiempo:number,
    public minimo:number,
    public maximo:number,
    ){}
}