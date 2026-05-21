const http = require('http');
const fs = require('fs');

const diretorio = process.argv[2];

if (!diretorio) {
    console.log('Informe um diretório.');
    process.exit();
}

const servidor = http.createServer((req, res) => {
    fs.readdir(diretorio, (erro, arquivos) => {
        if (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>Erro ao ler diretório</h1>');
            return;
        }

        let conteudo = '';

        arquivos.forEach(arquivo => {
            conteudo += `<p>${arquivo}</p>`;
        });

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(conteudo);
    });
});

servidor.listen(3333, () => {
    console.log('Servidor rodando em http://localhost:3333');
});
