import { Lembrete } from "./lembrete";

let lembretes: Lembrete[] = [];

export function adicionarLembrete(lembrete: Lembrete): void {
    lembretes.push(lembrete);
}

export function listarLembretes(): void {
    console.log("\nLista de lembretes:\n");

    lembretes.forEach((lembrete, index) => {
        console.log(`${index + 1} - ${lembrete[0]}`);
    });
}

export function editarLembrete(indice: number, novoTitulo: string): void {
    if (lembretes[indice]) {
        lembretes[indice][0] = novoTitulo;
    }
}

export function removerLembrete(indice: number): void {
    if (lembretes[indice]) {
        lembretes.splice(indice, 1);
    }
}