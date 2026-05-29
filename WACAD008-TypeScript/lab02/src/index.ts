import { Aluno } from "./Aluno";
import { Turma } from "./Turma";

const turma = new Turma(
    1,
    "Educação Física"
);

const aluno1 = new Aluno(
    1,
    "Mateus Silva",
    25,
    1.75,
    76
);

const aluno2 = new Aluno(
    2,
    "João Pedro",
    20,
    1.80,
    82
);

console.log("Adicionando alunos...");
turma.adicionarAluno(aluno1);
turma.adicionarAluno(aluno2);

console.log("Editando aluno...");
turma.editarAluno(
    1,
    "Mateus Silva Santos",
    26,
    1.75,
    78
);

console.log("Removendo aluno...");
turma.removerAluno(2);