import * as readline from "readline";
import {
    adicionarLembrete,
    listarLembretes,
    editarLembrete,
    removerLembrete
} from "./sistema";
import { Lembrete } from "./lembrete";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu(): void {
    console.log("\n===== MENU =====");
    console.log("1 - Adicionar lembrete");
    console.log("2 - Listar lembretes");
    console.log("3 - Editar lembrete");
    console.log("4 - Remover lembrete");
    console.log("0 - Sair");

    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                adicionar();
                break;

            case "2":
                listarLembretes();
                menu();
                break;

            case "3":
                editar();
                break;

            case "4":
                remover();
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

function adicionar(): void {
    rl.question("Título: ", (titulo) => {
        rl.question("Data de inserção: ", (dataInsercao) => {
            rl.question("Data limite: ", (dataLimite) => {
                rl.question("Descrição: ", (descricao) => {

                    const lembrete: Lembrete = [
                        titulo,
                        dataInsercao,
                        dataLimite,
                        descricao
                    ];

                    adicionarLembrete(lembrete);

                    console.log("Lembrete adicionado.");
                    menu();
                });
            });
        });
    });
}

function editar(): void {
    listarLembretes();

    rl.question("Número do lembrete: ", (indice) => {
        rl.question("Novo título: ", (titulo) => {

            editarLembrete(
                Number(indice) - 1,
                titulo
            );

            console.log("Lembrete atualizado.");
            menu();
        });
    });
}

function remover(): void {
    listarLembretes();

    rl.question("Número do lembrete: ", (indice) => {

        removerLembrete(
            Number(indice) - 1
        );

        console.log("Lembrete removido.");
        menu();
    });
}

menu();