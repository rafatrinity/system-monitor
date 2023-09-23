const API_URL = "http://localhost:3000";
const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
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
        },
      })
    );
  return reader;
}

let abortController = new AbortController();

start.addEventListener('click', async()=>{
  const data = await consumeStream(abortController.signal);
})

stop.addEventListener('click',()=>{
  abortController.abort()
  console.log('aborting...');
  abortController = new AbortController();
})
