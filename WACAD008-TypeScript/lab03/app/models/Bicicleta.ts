import type { Produto } from "@/types/produto";

export class Bicicleta implements Produto {
    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public aro: number
    ) { }
}
