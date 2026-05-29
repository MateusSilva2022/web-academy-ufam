

import { Carrinho } from "./Carrinho";
import { TV } from "./TV";
import { Celular } from "./Celular";
import { Bicicleta } from "./Bicicleta";

const carrinho = new Carrinho();

const tv = new TV(
    "Samsung Crystal",
    "4K",
    55,
    "Samsung",
    2500
);

const celular = new Celular(
    "Galaxy S24",
    "256GB",
    "Samsung",
    4500
);

const bicicleta = new Bicicleta(
    "Caloi Explorer",
    29,
    "Caloi",
    1800
);

console.log("Adicionando TV...");
carrinho.adicionarProduto(tv);

console.log("Adicionando Celular...");
carrinho.adicionarProduto(celular);

console.log("Adicionando Bicicleta...");
carrinho.adicionarProduto(bicicleta);