<script setup lang="ts">
import { Aluno } from "@/types/Aluno";
import { Turma } from "@/types/Turma";

const turma = reactive<Turma>(new Turma(1, "Turma WACAD008"))

const alunoData = reactive<Aluno>({
    id: 0,
    nomeCompleto: "",
    idade: 0,
    altura: 0,
    peso: 0
})
function limparDados() {
    alunoData.id = 0;
    alunoData.nomeCompleto = "";
    alunoData.idade = 0;
    alunoData.altura = 0;
    alunoData.peso = 0;
}

// Adicionar aluno à turma
function adicionarAluno() {

    const newId = turma.alunos.length > 0 ? Math.max(...turma.alunos.map(a => a.id)) + 1 : 1;

    const novoAluno = new Aluno(
        newId,
        alunoData.nomeCompleto,
        alunoData.idade,
        alunoData.altura,
        alunoData.peso
    );
    turma.adicionarAluno(novoAluno);
    limparDados();
}

// remover aluno da turma
function removerAluno(id: number) {
    turma.removerAluno(id);
}

// buscar aluno na turma
function buscarAluno(id: number) {
    const aluno = turma.alunos.find(a => a.id === id);
    if (aluno) {
        alunoData.id = aluno.id;
        alunoData.nomeCompleto = aluno.nomeCompleto;
        alunoData.idade = aluno.idade;
        alunoData.altura = aluno.altura;
        alunoData.peso = aluno.peso;
    }
}

// editar aluno na turma
function editarAluno(id: number, nomeCompleto: string, idade: number, altura: number, peso: number) {
    const aluno = turma.alunos.find(a => a.id === id);
    if (aluno) {
        turma.editarAluno(
            aluno.id,
            nomeCompleto,
            idade,
            altura,
            peso
        );
    }
    limparDados();
}

function salvarAluno() {
    if (alunoData.id === 0) {
        adicionarAluno();
    } else {
        editarAluno(alunoData.id, alunoData.nomeCompleto, alunoData.idade, alunoData.altura, alunoData.peso);
    }
}


const estatisticas = computed(() => {
    return {
        quantidadeAlunos: turma.getNumAlunos(),
        mediaIdade: turma.getMediaIdades().toFixed(2),
        mediaAltura: turma.getMediaAlturas().toFixed(2),
        mediaPeso: turma.getMediaPesos().toFixed(2)
    }
})
</script>

<template>
    <div class="h-screen w-screen">
        <div class="flex items-center justify-center mt-10 mb-5">
            <h1>WACAD008 TypeScript Lab 02</h1>
        </div>

        <div class="flex items-center justify-center mt-5">
            <div class="w-1/2 p-4 border rounded">
                <h2 class="text-xl mb-4">Adicionar Aluno</h2>
                <form @submit.prevent="salvarAluno" class="space-y-4">
                    <div v-if="alunoData.id !== 0">
                        <label for="id" class="block mb-1">ID:</label>
                        <input v-model="alunoData.id" type="number" id="id" class="w-full border p-2 rounded" required>
                    </div>
                    <div>
                        <label for="nomeCompleto" class="block mb-1">Nome Completo:</label>
                        <input v-model="alunoData.nomeCompleto" type="text" id="nomeCompleto"
                            class="w-full border p-2 rounded" required>
                    </div>
                    <div>
                        <label for="idade" class="block mb-1">Idade:</label>
                        <input v-model="alunoData.idade" type="number" id="idade" class="w-full border p-2 rounded"
                            required>
                    </div>
                    <div>
                        <label for="altura" class="block mb-1">Altura (m):</label>
                        <input v-model="alunoData.altura" type="number" step="0.01" id="altura"
                            class="w-full border p-2 rounded" required>
                    </div>
                    <div>
                        <label for="peso" class="block mb-1">Peso (kg):</label>
                        <input v-model="alunoData.peso" type="number" step="0.01" id="peso"
                            class="w-full border p-2 rounded" required>
                    </div>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">{{ alunoData.id === 0 ? 'Adicionar' : 'Editar' }}</button>
                </form>
            </div>

            <div>
                <div class="w-1/2 p-4 border rounded ml-4">
                    <h2 class="text-xl mb-4">Estatísticas da Turma</h2>
                    <p><strong>Quantidade de Alunos:</strong> {{ estatisticas.quantidadeAlunos }}</p>
                    <p><strong>Idade Média:</strong> {{ estatisticas.mediaIdade }}</p>
                    <p><strong>Altura Média:</strong> {{ estatisticas.mediaAltura }}</p>
                    <p><strong>Peso Médio:</strong> {{ estatisticas.mediaPeso }}</p>
                </div>
                <div class="w-full mx-5 mt-5 p-4 border rounded">
                    <h2 class="text-xl mb-4">Alunos na Turma</h2>
                    <table class="w-full border-collapse">
                        <thead>
                            <tr>
                                <th class="border p-2">ID</th>
                                <th class="border p-2">Nome Completo</th>
                                <th class="border p-2">Idade</th>
                                <th class="border p-2">Altura (m)</th>
                                <th class="border p-2">Peso (kg)</th>
                                <th class="border p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="aluno in turma.alunos" :key="aluno.id">
                                <td class="border p-2">{{ aluno.id }}</td>
                                <td class="border p-2">{{ aluno.nomeCompleto }}</td>
                                <td class="border p-2">{{ aluno.idade }}</td>
                                <td class="border p-2">{{ aluno.altura }}</td>
                                <td class="border p-2">{{ aluno.peso }}</td>
                                <td class="border p-2">
                                    <button @click="buscarAluno(aluno.id)"
                                        class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                                    <button @click="removerAluno(aluno.id)"
                                        class="bg-red-500 text-white px-2 py-1 rounded">Remover</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
