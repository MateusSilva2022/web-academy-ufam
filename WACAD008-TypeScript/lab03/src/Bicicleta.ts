import { IProduto } from "./IProduto";

export class Bicicleta implements IProduto {
    constructor(
        public modelo: string,
        public aro: number,
        public fabricante: string,
        public valor: number
    ) {}
}