import type { Lembrete } from "@/types";

export default function useReminder() {

    let lembretes: Lembrete[] = [];

    let storage = localStorage.getItem("lembretes");

    if (storage) {
        lembretes = JSON.parse(storage);
    } else {
        localStorage.setItem("lembretes", JSON.stringify(lembretes));
    }

    function adicionarLembrete(lembrete: Lembrete): Lembrete[] {
        lembretes.push(lembrete);
        localStorage.setItem("lembretes", JSON.stringify(lembretes));
        return lembretes;
    }

    function listarLembretes(): Lembrete[] {
        return lembretes;
    }

    function editarLembrete(id: number, lembrete: Lembrete): Lembrete[] {
        const index = lembretes.findIndex(l => l.id === id);
        if (lembretes[index]) {
            lembretes[index] = lembrete;
        }
        localStorage.setItem("lembretes", JSON.stringify(lembretes));
        return lembretes;
    }

    function removerLembrete(id: number): Lembrete[] {
        const indice = lembretes.findIndex(l => l.id === id);
        if (lembretes[indice]) {
            lembretes.splice(indice, 1);
        }
        localStorage.setItem("lembretes", JSON.stringify(lembretes));
        return lembretes;
    }

    return {
        adicionarLembrete,
        listarLembretes,
        editarLembrete,
        removerLembrete
    };
}
