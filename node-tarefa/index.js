import fs from 'fs';
import http from 'http';
const dir = process.argv[2] || '.';
import path from 'path';
import dotenv from 'dotenv';
import { createLink } from './util.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT || 3333;

const server = http.createServer(function (requisicao, resposta) {
  const caminho = path.join(dir, requisicao.url);
  resposta.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });

  if (requisicao.url === "/") {
    fs.readdir(dir, (err, arquivos) => {
      if (err) {
        console.log(err);
        resposta.end("Erro ao ler diretório.");
        return;
      }
      resposta.write("<ul>");
      arquivos.forEach(arquivo => {
        resposta.write(`<li>${createLink(arquivo)}</li>`);
      });
      resposta.write("</ul>");
      resposta.end();
    });
  } else {
    fs.readFile(caminho, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        resposta.end("Arquivo não encontrado.");
        return;
      }
      resposta.write('<br><a href="/">voltar</a><br><br>')
      resposta.write(data);
      resposta.end();
    });
  }
});

server.listen(port);
