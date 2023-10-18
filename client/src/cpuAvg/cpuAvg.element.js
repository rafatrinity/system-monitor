const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

start.addEventListener("click", async () => {
  const cpuAvg = document.getElementById("cpuAvg");
  if (!cpuAvg) {
    while (!window?.chunk?.CPU_Usage) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    const gridContainer = document.getElementById("gridContainer");

    const cpuAvg = document.createElement("canvas");

    cpuAvg.id = "cpuAvg";
    cpuAvg.style = `display: grid;
                    grid-area: 1 / 1 / 3 / 7;
                    width: 100%;
                    max-height: 35vh;
                    max-width: 100%`;

    gridContainer.appendChild(cpuAvg);
  }
});
