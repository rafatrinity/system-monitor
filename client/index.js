/**
 * URL da API.
 * @type {string}
 */
const API_URL = "http://localhost:3000";

/**
 * Botões de início e parada.
 * @type {HTMLElement[]}
 */
const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

/**
 * Controlador de aborto para interromper a solicitação fetch.
 * @type {AbortController}
 */
let abortController = new AbortController();

/**
 * Consome o fluxo da API.
 *
 * @param {AbortSignal} signal - Sinal para abortar a solicitação fetch.
 * @returns {Promise<ReadableStreamDefaultReader>} O leitor do fluxo de resposta.
 */
async function consumeStream(signal) {
  const response = await fetch(API_URL, {
    signal,
  });
  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(JSON.parse(chunk));
        },
      })
    )
    .pipeTo(
      new WritableStream({
        write(chunk) {
          console.log(chunk);
          window.chunk = chunk;
        },
      })
    );
  return reader;
}

start.addEventListener('click', async()=>{
  await consumeStream(abortController.signal);
})

stop.addEventListener('click',()=>{
  abortController.abort()
  console.log('aborting...');
  abortController = new AbortController();
})