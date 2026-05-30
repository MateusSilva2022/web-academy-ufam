import * as readline from "readline";
import { Carrinho } from "./Carrinho";
import { TV } from "./TV";
import { Celular } from "./Celular";
import { Bicicleta } from "./Bicicleta";

const carrinho = new Carrinho();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu(): void {
    console.log("\n===== MENU =====");
    console.log("1 - Adicionar TV");
    console.log("2 - Adicionar Celular");
    console.log("3 - Adicionar Bicicleta");
    console.log("4 - Ver Carrinho");
    console.log("0 - Sair");

    rl.question("Escolha uma opção: ", (opcao: string) => {

        switch (opcao) {

            case "1":
                adicionarTV();
                break;

            case "2":
                adicionarCelular();
                break;

            case "3":
                adicionarBicicleta();
                break;

            case "4":
                carrinho.exibirCarrinho();
                menu();
                break;

            case "0":
                rl.close();
                break;

            default:
                console.log("Opção inválida.");
                menu();
        }
    });
}

function adicionarTV(): void {

    rl.question("Modelo: ", (modelo: string) => {

        rl.question("Resolução: ", (resolucao: string) => {

            rl.question("Tamanho: ", (tamanho: string) => {

                rl.question("Fabricante: ", (fabricante: string) => {

                    rl.question("Valor: ", (valor: string) => {

                        const tv = new TV(
                            modelo,
                            resolucao,
                            Number(tamanho),
                            fabricante,
                            Number(valor)
                        );

                        carrinho.adicionarProduto(tv);

                        console.log("TV adicionada.");
                        menu();
                    });
                });
            });
        });
    });
}

function adicionarCelular(): void {

    rl.question("Modelo: ", (modelo: string) => {

        rl.question("Memória: ", (memoria: string) => {

            rl.question("Fabricante: ", (fabricante: string) => {

                rl.question("Valor: ", (valor: string) => {

                    const celular = new Celular(
                        modelo,
                        memoria,
                        fabricante,
                        Number(valor)
                    );

                    carrinho.adicionarProduto(celular);

                    console.log("Celular adicionado.");
                    menu();
                });
            });
        });
    });
}

function adicionarBicicleta(): void {

    rl.question("Modelo: ", (modelo: string) => {

        rl.question("Aro: ", (aro: string) => {

            rl.question("Fabricante: ", (fabricante: string) => {

                rl.question("Valor: ", (valor: string) => {

                    const bicicleta = new Bicicleta(
                        modelo,
                        Number(aro),
                        fabricante,
                        Number(valor)
                    );

                    carrinho.adicionarProduto(bicicleta);

                    console.log("Bicicleta adicionada.");
                    menu();
                });
            });
        });
    });
}

menu();