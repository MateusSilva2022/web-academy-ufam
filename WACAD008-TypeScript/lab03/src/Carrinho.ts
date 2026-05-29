import { IProduto } from "./IProduto";

export class Carrinho<T extends IProduto> {
    private produtos: T[] = [];

    adicionarProduto(produto: T): void {
        this.produtos.push(produto);
        this.exibirCarrinho();
    }

    getQuantidadeProdutos(): number {
        return this.produtos.length;
    }

    getValorTotal(): number {
        return this.produtos.reduce(
            (total, produto) => total + produto.valor,
            0
        );
    }

    exibirCarrinho(): void {
        console.log("\n===== CARRINHO =====");
        console.log(
            `Quantidade de produtos: ${this.getQuantidadeProdutos()}`
        );
        console.log(
            `Valor total: R$ ${this.getValorTotal().toFixed(2)}`
        );
        console.log("====================\n");
    }
}