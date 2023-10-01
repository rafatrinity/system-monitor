const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

start.addEventListener("click", async () => {
  const cpuAvg = document.getElementById("cpuAvg");
  if (!cpuAvg) {
    while (!window?.chunk?.CPU_Usage) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    const cpuContainer = document.getElementById("cpuContainer");

    const cpuAvg = document.createElement("canvas");

    cpuAvg.id = "cpuAvg";
    cpuAvg.style = `grid-column-start: 1;
                      grid-column-end: 3;
                      grid-row-start: 1;
                      grid-row-end: 3;
                      display: grid;
                      object-fit: contain;
                      max-height: 300px;`;

    cpuContainer.appendChild(cpuAvg);
  }
});
