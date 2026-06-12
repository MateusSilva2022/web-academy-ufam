import { Carrinho } from "@/models/Carrinho";
import type { Produto } from "@/types/produto";

const carrinho = new Carrinho<Produto>();

export default function useCarrinho() {
    const produtos = useState<Produto[]>(
        "produtos",
        () => []
    );

    function adicionar(produto: Produto) {
        carrinho.adicionar(produto);
        produtos.value = [...carrinho.listar()];
    }

    return {
        produtos,
        adicionar,
    };
}
