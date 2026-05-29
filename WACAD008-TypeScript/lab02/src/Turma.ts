import { Aluno } from "./Aluno";

export class Turma {
    private alunos: Aluno[] = [];

    constructor(
        public id: number,
        public nome: string
    ) {}

    adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno);
        this.exibirEstatisticas();
    }

    editarAluno(
        id: number,
        nome: string,
        idade: number,
        altura: number,
        peso: number
    ): void {
        const aluno = this.alunos.find(a => a.id === id);

        if (aluno) {
            aluno.nomeCompleto = nome;
            aluno.idade = idade;
            aluno.altura = altura;
            aluno.peso = peso;

            this.exibirEstatisticas();
        }
    }

    removerAluno(id: number): void {
        this.alunos = this.alunos.filter(a => a.id !== id);
        this.exibirEstatisticas();
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

    exibirEstatisticas(): void {
        console.log("\n===== ESTATÍSTICAS DA TURMA =====");
        console.log(`Quantidade de alunos: ${this.getNumAlunos()}`);
        console.log(`Média de idade: ${this.getMediaIdades().toFixed(2)}`);
        console.log(`Média de altura: ${this.getMediaAlturas().toFixed(2)}`);
        console.log(`Média de peso: ${this.getMediaPesos().toFixed(2)}`);
        console.log("=================================\n");
    }
}