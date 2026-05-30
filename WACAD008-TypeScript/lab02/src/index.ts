import * as readline from "readline";
import { Aluno } from "./Aluno";
import { Turma } from "./Turma";

const turma = new Turma(
    1,
    "Educação Física"
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu(): void {
    console.log("\n===== MENU =====");
    console.log("1 - Adicionar aluno");
    console.log("2 - Editar aluno");
    console.log("3 - Remover aluno");
    console.log("4 - Exibir estatísticas");
    console.log("0 - Sair");

    rl.question("Escolha uma opção: ", (opcao: string) => {

        switch (opcao) {

            case "1":
                adicionarAluno();
                break;

            case "2":
                editarAluno();
                break;

            case "3":
                removerAluno();
                break;

            case "4":
                turma.exibirEstatisticas();
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

function adicionarAluno(): void {

    rl.question("ID: ", (id: string) => {

        rl.question("Nome: ", (nome: string) => {

            rl.question("Idade: ", (idade: string) => {

                rl.question("Altura: ", (altura: string) => {

                    rl.question("Peso: ", (peso: string) => {

                        const aluno = new Aluno(
                            Number(id),
                            nome,
                            Number(idade),
                            Number(altura),
                            Number(peso)
                        );

                        turma.adicionarAluno(aluno);

                        console.log("Aluno adicionado.");
                        menu();
                    });
                });
            });
        });
    });
}

function editarAluno(): void {

    rl.question("ID do aluno: ", (id: string) => {

        rl.question("Novo nome: ", (nome: string) => {

            rl.question("Nova idade: ", (idade: string) => {

                rl.question("Nova altura: ", (altura: string) => {

                    rl.question("Novo peso: ", (peso: string) => {

                        turma.editarAluno(
                            Number(id),
                            nome,
                            Number(idade),
                            Number(altura),
                            Number(peso)
                        );

                        console.log("Aluno atualizado.");
                        menu();
                    });
                });
            });
        });
    });
}

function removerAluno(): void {

    rl.question("ID do aluno: ", (id: string) => {

        turma.removerAluno(
            Number(id)
        );

        console.log("Aluno removido.");
        menu();
    });
}

menu();