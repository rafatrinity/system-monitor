/**
 * @fileoverview Servidor HTTP simples usando Node.js.
 * @module index
 */
import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { WritableStream } from 'node:stream/web';

import SystemInfoStream from './dataGenerator.js';

const PORT = 3000;

/**
 * Cria um servidor HTTP para lidar com as solicitações.
 *
 * @param {http.IncomingMessage} request - A solicitação HTTP recebida.
 * @param {http.ServerResponse} response - A resposta HTTP a ser enviada.
 */
createServer(async (request, response) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  };

  if (request.method === "OPTIONS") {
    // Responde com status 204 (No Content) para solicitações OPTIONS
    response.writeHead(204, headers);
    response.end();
    return;
  }

  // Registra um callback para o evento 'close' na solicitação
  request.once("close", (_) => console.log("A conexão foi encerrada!"));

  // Converte um fluxo personalizado (SystemInfoStream) em um fluxo legível para a web
  Readable.toWeb(new SystemInfoStream()).pipeTo(
    new WritableStream({
      write(chunk) {
        response.write(chunk);
      },
      close() {
        response.close();
      },
    })
  );

  // Escreve o cabeçalho de resposta com status 200 (OK)
  response.writeHead(200, headers);
})
  .listen(PORT)
  .on("error", (err) => {
    console.error(`Erro no servidor: ${err}`);
  })
  .on("listening", (_) => {
    console.log(`O servidor está em execução na porta ${PORT}`);
  });
