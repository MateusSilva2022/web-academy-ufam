import type { Produto } from "@/types/produto";

export class TV implements Produto {
    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public resolucao: string,
        public tamanho: number
    ) { }
}
