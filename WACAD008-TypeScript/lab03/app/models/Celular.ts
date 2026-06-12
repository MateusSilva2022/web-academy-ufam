import type { Produto } from "@/types/produto";

export class Celular implements Produto {
    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public memoria: number
    ) { }
}
