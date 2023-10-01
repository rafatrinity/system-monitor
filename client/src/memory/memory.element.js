const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

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
    const memoryContainer = document.getElementById("memoryContainer");

    const memoryUsage = document.createElement("canvas");

    memoryUsage.id = "memoryUsage";
    memoryUsage.style = `display: grid;
                         object-fit: contain;
                         max-height: 300px;`;

    memoryContainer.appendChild(memoryUsage);

    // const memoryInfo = document.createElement("div");
    // memoryUsage.id = "memoryInfo";
    // memoryContainer.appendChild(memoryInfo);
    // setInterval(() => updateMemoryInfo(memoryInfo), 1000);
  }
});
