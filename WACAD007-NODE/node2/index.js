import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createLink } from './util.js';

const ambiente = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${ambiente}` });

const diretorio = process.argv[2];
const porta = process.env.PORT || 3333;

const servidor = http.createServer((req, res) => {
    if (req.url !== '/') {
        const arquivo = path.join(diretorio, req.url);

        fs.readFile(arquivo, 'utf-8', (erro, conteudo) => {
            if (erro) {
                res.writeHead(404);
                res.end('Arquivo não encontrado');
                return;
            }

            res.end(`<a href="/">Voltar</a><br><br>${conteudo}`);
        });

        return;
    }

    fs.readdir(diretorio, (erro, arquivos) => {
        if (erro) {
            res.writeHead(500);
            res.end('Erro ao ler diretório');
            return;
        }

        let conteudo = '';

        arquivos.forEach((arquivo) => {
            conteudo += createLink(arquivo);
        });

        res.end(conteudo);
    });
});

servidor.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});