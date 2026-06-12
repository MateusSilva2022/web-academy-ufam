<script setup lang="ts">
import useReminder from '@/composables/useReminder';
import type { Lembrete } from "@/types";

const items = useReminder();

const lembretes = ref<Lembrete[]>([]);
const updateId = ref<number>(0);
const novoLembrete = reactive({
    id: 0,
    titulo: '',
    descricao: '',
})

function adicionarLembrete() {
    let novoId = lembretes.value.length > 0 ? Math.max(...lembretes.value.map(l => l.id)) + 1 : 1;
    const lembrete: Lembrete = {
        id: novoId,
        titulo: novoLembrete.titulo,
        descricao: novoLembrete.descricao,
    };
    items.adicionarLembrete(lembrete);
    limparCampos();
    return listarLembretes();
}

function removerLembrete(id: number) {
    items.removerLembrete(id);
    return listarLembretes();
}

function editarLembrete(id: number) {
    const lembrete = lembretes.value.find(l => l.id === id);
    if (lembrete) {

        items.editarLembrete(id, {
            id: lembrete.id,
            titulo: novoLembrete.titulo,
            descricao: novoLembrete.descricao,
        });
        limparCampos();
        return listarLembretes();
    }
}

function pegarLembrete(id: number) {
    const lembrete = lembretes.value.find(l => l.id === id);
    if (lembrete) {
        updateId.value = id;
        novoLembrete.id = lembrete.id;
        novoLembrete.titulo = lembrete.titulo;
        novoLembrete.descricao = lembrete.descricao;
    }
}

function limparCampos() {
    novoLembrete.id = 0;
    novoLembrete.titulo = '';
    novoLembrete.descricao = '';
    updateId.value = 0;
}

function listarLembretes() {
    const lista = items.listarLembretes();
    lembretes.value = [...lista];
}

onMounted(() => {
    listarLembretes();
});

</script>

<template>
    <div class="h-screen w-screen">
        <div class="flex items-center justify-center mt-10 mb-5">
            <h1>WACAD008 TypeScript Lab 01</h1>
        </div>

        <div class="flex flex-col items-center justify-center">
            <label class="" for="lembrete">Adicionar Lembrete</label>
            <input v-model="novoLembrete.titulo" class="border-2 border-gray-300 rounded-md p-2 w-96 mb-4 " placeholder="Titulo" id="lembrete" type="text" />
            <textarea v-model="novoLembrete.descricao" class="border-2 border-gray-300 rounded-md p-2 w-96 mb-4" placeholder="Descrição do lembrete"></textarea>
            <div v-if="updateId > 0" class="flex space-x-2 mb-4">
                <button class="bg-green-500 text-white px-4 py-2 rounded-md" @click="editarLembrete(updateId)">Salvar</button>
                <button class="bg-gray-500 text-white px-4 py-2 rounded-md" @click="limparCampos">Cancelar</button>
            </div>
            <button v-else class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" @click="adicionarLembrete">Adicionar</button>
        </div>

        <div class="flex flex-col justify-center w-1/2 mx-auto">
            <h2 class="text-xl font-bold mb-4 text-center">Lembretes</h2>
            <ul class="">
                <li v-for="lembrete in lembretes" :key="lembrete.id" class="mb-2">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-lg font-semibold">{{ lembrete.titulo }}</h3>
                            <p>{{ lembrete.descricao }}</p>
                        </div>
                        <div>
                            <button class="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                                @click="pegarLembrete(lembrete.id)">Editar</button>
                            <button class="bg-red-500 text-white px-2 py-1 rounded-md"
                                @click="removerLembrete(lembrete.id)">Remover</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
