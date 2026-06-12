<script setup lang="ts">
import { TV } from "@/models/TV";
import { Celular } from "@/models/Celular";
import { Bicicleta } from "@/models/Bicicleta";
import useCarrinho from "@/composables/useCarrinho";

const {
    produtos,
    adicionar,
} = useCarrinho();

const tipo = ref("tv");

const formulario = reactive({
    modelo: "",
    fabricante: "",
    valor: 0,

    resolucao: "",
    tamanho: 0,

    memoria: 0,

    aro: 0
});

function resetarFormulario() {
    formulario.modelo = "";
    formulario.fabricante = "";
    formulario.valor = 0;
    formulario.resolucao = "";
    formulario.tamanho = 0;
    formulario.memoria = 0;
    formulario.aro = 0;
}

function inserirProduto() {
    switch (tipo.value) {
        case "tv":
            adicionar(
                new TV(
                    formulario.modelo,
                    formulario.fabricante,
                    formulario.valor,
                    formulario.resolucao,
                    formulario.tamanho
                )
            );
            break;

        case "celular":
            adicionar(
                new Celular(
                    formulario.modelo,
                    formulario.fabricante,
                    formulario.valor,
                    formulario.memoria
                )
            );
            break;

        case "bicicleta":
            adicionar(
                new Bicicleta(
                    formulario.modelo,
                    formulario.fabricante,
                    formulario.valor,
                    formulario.aro
                )
            );
            break;
    }
    resetarFormulario();
}

function removerProduto(index: number) {
    produtos.value.splice(index, 1);
}

const quantidade = computed(() => produtos.value.length);
const total = computed(() => produtos.value.reduce((acc, produto) => acc + produto.valor, 0));

</script>

<template>
    <div class="flex items-center justify-center mt-10 mb-5">
        <h1>WACAD008 TypeScript Lab 03</h1>
    </div>
    <h1 class="font-semibold">Produtos</h1>

    <form class="flex flex-col gap-2 w-1/2" @submit.prevent="inserirProduto">
        <div>
            <label for="tipo" class="px-4">Tipo:</label>
            <select id="tipo" v-model="tipo">
                <option value="tv">TV</option>
                <option value="celular">Celular</option>
                <option value="bicicleta">Bicicleta</option>
            </select>
        </div>

        <div>
            <label for="modelo" class="px-4">Modelo:</label>
            <input class="bg-gray-200 rounded border-gray-300" id="modelo" v-model="formulario.modelo" />
        </div>

        <div>
            <label for="fabricante" class="px-4">Fabricante:</label>
            <input class="bg-gray-200 rounded border-gray-300" id="fabricante" v-model="formulario.fabricante" />
        </div>

        <div>
            <label for="valor" class="px-4">Valor:</label>
            <input class="bg-gray-200 rounded border-gray-300" id="valor" type="number" v-model.number="formulario.valor" />
        </div>

        <div v-if="tipo === 'tv'">
            <label for="resolucao" class="px-4">Resolução:</label>
            <input class="bg-gray-200 rounded border-gray-300" id="resolucao" v-model="formulario.resolucao" />

            <label for="tamanho" class="px-4">Tamanho (polegadas):</label>
            <input class="bg-gray-200 rounded border-gray-300" id="tamanho" type="number" v-model.number="formulario.tamanho" />
        </div>

        <div v-else-if="tipo === 'celular'">
            <label for="memoria" class="px-4">Memória (GB):</label>
            <input class="bg-gray-200 rounded border-gray-300" id="memoria" type="number" v-model.number="formulario.memoria" />
        </div>

        <div v-else-if="tipo === 'bicicleta'">
            <label for="aro" class="px-4">Aro (polegadas):</label>
            <input class="bg-gray-200 rounded border-gray-300" id="aro" type="number" v-model.number="formulario.aro" />
        </div>

        <button class="bg-blue-500 text-white px-4 py-2 rounded w-(10rem)" type="submit">Adicionar ao Carrinho</button>
    </form>
    <div class="mt-8">
        <div>
            <h2 class="font-semibold">Estatísticas</h2>

            <p>Quantidade: {{ quantidade }}</p>
            <p>Total: R$ {{ total.toFixed(2) }}</p>
        </div>
        <div class="mt-4">
            <h2 class="font-semibold">Produtos</h2>

            <ul class="list-disc list-inside">
                <li v-for="(produto, index) in produtos" :key="index">
                    {{ produto.modelo }}
                    -
                    {{ produto.fabricante }}
                    -
                    R$ {{ produto.valor }}
                    <button class="bg-red-500 text-white px-2 py-1 rounded ml-2" @click="removerProduto(index)">Remover</button>
                </li>
            </ul>
        </div>
    </div>
</template>
