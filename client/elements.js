const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
start.addEventListener("click", async () => {
  while (!window?.CpuUsage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  var cpuContainer = document.createElement("div");
  cpuContainer.className = "cpuContainer";
  cpuContainer.style = `display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        grid-column-gap: 10px;
                        grid-row-gap: 1em;
                        width: 98vw;
                        height: 98vh;
                        align-content: center;`;
  document.body.appendChild(cpuContainer);

  let cpuAvg = document.createElement("canvas");
  cpuAvg.id = "cpuAvg";
  cpuAvg.style = `grid-column-start: 1;
                  grid-column-end: 3;
                  grid-row-start: 1;
                  grid-row-end: 3;
                  display: grid;
                  max-width: 97vw;
                  max-height: ${(98 / window.CpuUsage?.length) * 2}vh;`;
  cpuContainer.appendChild(cpuAvg);

  for (let i = 0; i < window.CpuUsage?.length; i++) {
    let cpu = document.createElement("canvas");
    cpu.id = "cpu" + i;
    cpu.style = `
                display: grid;
                max-width: 98%;
                max-height: ${98 / window.CpuUsage?.length}vh;`;
    cpuContainer.appendChild(cpu);
  }
});
