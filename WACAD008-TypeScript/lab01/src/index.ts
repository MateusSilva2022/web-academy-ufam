import { Lembrete } from "./lembrete";
import {
    adicionarLembrete,
    listarLembretes,
    editarLembrete,
    removerLembrete
} from "./sistema";

const lembrete1: Lembrete = [
    "Estudar TypeScript",
    "21/05/2026 15:00",
    "25/05/2026",
    "Fazer exercícios do laboratório"
];

const lembrete2: Lembrete = [
    "Treino",
    "21/05/2026 16:00"
];

adicionarLembrete(lembrete1);
adicionarLembrete(lembrete2);

listarLembretes();

console.log("\nEditando lembrete...\n");

editarLembrete(0, "Estudar TypeScript Avançado");

listarLembretes();

console.log("\nRemovendo lembrete...\n");

removerLembrete(1);

listarLembretes();