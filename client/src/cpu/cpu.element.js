const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

start.addEventListener("click", async () => {
  while (!window?.chunk?.CPU_Usage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const cpuContainer = document.getElementById("cpuContainer");
  for (let i = 0; i < window.chunk?.CPU_Usage?.length; i++) {
    if (!document.getElementById("cpu" + i)) {
      const cpu = document.createElement("canvas");

      cpu.id = "cpu" + i;
      cpu.style = `display: grid; 
                   max-height: 150px; 
                   max-width: 100%;`;

      cpuContainer.appendChild(cpu);
    }
  }
});
