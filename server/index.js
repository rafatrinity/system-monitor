import { createServer } from 'node:http';
import { Readable } from 'node:stream';

import SystemInfoStream from './dataGenerator.js';


const PORT = 3000;
createServer(async (request, response) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  };
  if (request.method === "OPTIONS") {
    response.writeHead(204, headers); // No Content
    response.end();
    return;
  }
  Readable.toWeb(new SystemInfoStream()).pipeTo(
    new WritableStream({
      write(chunk) {
        response.write(chunk)
      },
      close() {
        response.close();
      },
    })
  );
  response.writeHead(200, headers);
})
  .listen(PORT)
  .on("error", (err) => {
    console.error(`Server error: ${err}`);
  })
  .on("listening", (_) => {
    console.log(`server is running at ${PORT}`);
  });
