import { Aluno } from "./Aluno";

export class Turma {

    constructor(
        public id: number,
        public nome: string,
        public alunos: Aluno[] = []
    ) { }

    adicionarAluno(aluno: Aluno) {
        this.alunos.push(aluno);
    }

    editarAluno(
        id: number,
        nome: string,
        idade: number,
        altura: number,
        peso: number
    ) {
        const aluno = this.alunos.find(a => a.id === id);

        if (aluno) {
            aluno.nomeCompleto = nome;
            aluno.idade = idade;
            aluno.altura = altura;
            aluno.peso = peso;
        }
    }

    removerAluno(id: number) {
        const index = this.alunos.findIndex(a => a.id === id);
        
        if (index !== -1) {
            this.alunos.splice(index, 1);
        }
        return this.alunos
    }

    getNumAlunos(): number {
        return this.alunos.length;
    }

    getMediaIdades(): number {
        if (this.alunos.length === 0) return 0;

        const soma = this.alunos.reduce(
            (total, aluno) => total + aluno.idade,
            0
        );

        return soma / this.alunos.length;
    }

    getMediaAlturas(): number {
        if (this.alunos.length === 0) return 0;

        const soma = this.alunos.reduce(
            (total, aluno) => total + aluno.altura,
            0
        );

        return soma / this.alunos.length;
    }

    getMediaPesos(): number {
        if (this.alunos.length === 0) return 0;

        const soma = this.alunos.reduce(
            (total, aluno) => total + aluno.peso,
            0
        );

        return soma / this.alunos.length;
    }
}
