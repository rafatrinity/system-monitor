/**
 * Botões de início e parada.
 * @type {HTMLElement[]}
 */
const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

/**
 * Atualiza as informações de memória na página.
 *
 * @param {HTMLElement} memoryInfo - O elemento HTML onde as informações de memória serão exibidas.
 */
function updateMemoryInfo(memoryInfo) {
  memoryInfo.innerHTML = `free: ${window?.chunk?.Free_Memory}
                          total: ${window?.chunk?.Total_Memory}
                          allocade: ${
                            window?.chunk?.Total_Memory -
                            window?.chunk?.Free_Memory
                          }`;
}

start.addEventListener("click", async () => {
  const memoryUsage = document.getElementById("memoryUsage");
  if (!memoryUsage) {
    while (!window?.chunk?.Usage_Memory) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    const gridContainer = document.getElementById("gridContainer");

    const memoryUsage = document.createElement("canvas");

    memoryUsage.id = "memoryUsage";
    memoryUsage.style = `display: grid;
                          grid-area: 1 / 7 / 3 / 13;
                          width: 100%;
                          max-height: 35vh;
                          max-width: 100%`;

    gridContainer.appendChild(memoryUsage);

    // const memoryInfo = document.createElement("div");
    // memoryUsage.id = "memoryInfo";
    // memoryContainer.appendChild(memoryInfo);
    // setInterval(() => updateMemoryInfo(memoryInfo), 1000);
  }
});
