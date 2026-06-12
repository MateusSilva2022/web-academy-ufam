import type { Produto } from "@/types/produto";

export class Carrinho<T extends Produto> {
    private itens: T[] = [];

    adicionar(produto: T) {
        this.itens.push(produto);
    }

    listar() {
        return this.itens;
    }

    total() {
        return this.itens.reduce(
            (soma, item) => soma + item.valor,
            0
        );
    }

    quantidade() {
        return this.itens.length;
    }
}
