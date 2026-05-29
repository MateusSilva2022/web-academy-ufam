import { IProduto } from "./IProduto";

export class TV implements IProduto {
    constructor(
        public modelo: string,
        public resolucao: string,
        public tamanho: number,
        public fabricante: string,
        public valor: number
    ) {}
}