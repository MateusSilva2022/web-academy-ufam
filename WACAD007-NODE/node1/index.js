const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createLink } = require('./util');

const ambiente = process.env.NODE_ENV || 'development';

dotenv.config({
    path: `.env.${ambiente}`
});

const diretorio = process.argv[2];
const porta = process.env.PORT || 3333;

if (!diretorio) {
    console.log('Informe um diretório.');
    process.exit();
}

const servidor = http.createServer((req, res) => {
    const arquivoSolicitado = req.url.replace('/', '');

    if (arquivoSolicitado) {
        const caminhoArquivo = path.join(diretorio, arquivoSolicitado);

        fs.readFile(caminhoArquivo, 'utf8', (erro, conteudo) => {
            if (erro) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>Arquivo não encontrado</h1>');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<a href="/">Voltar</a><br><br>${conteudo}`);
        });

        return;
    }

    fs.readdir(diretorio, (erro, arquivos) => {
        if (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>Erro ao ler diretório</h1>');
            return;
        }

        let conteudo = '';

        arquivos.forEach((arquivo) => {
            conteudo += createLink(arquivo);
        });

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(conteudo);
    });
});

servidor.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});