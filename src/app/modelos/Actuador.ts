export class Actuador {
    
    constructor(
        public id: number,
        public estado: number,
        public nombre: String,
        public caracteristica: String,
        public invernadero_id_invernadero: number,
    ) { }
}