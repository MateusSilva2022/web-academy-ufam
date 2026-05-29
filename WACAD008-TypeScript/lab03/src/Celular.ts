import { IProduto } from "./IProduto";

export class Celular implements IProduto {
    constructor(
        public modelo: string,
        public memoria: string,
        public fabricante: string,
        public valor: number
    ) {}
}