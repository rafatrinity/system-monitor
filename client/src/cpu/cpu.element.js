const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

start.addEventListener("click", async () => {
  while (!window?.chunk?.CPU_Usage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const gridContainer = document.getElementById("gridContainer");
  for (let i = 0; i < window.chunk?.CPU_Usage?.length; i++) {
    if (!document.getElementById("cpu" + i)) {
      const cpu = document.createElement("canvas");

      const row = Math.floor(i/4);
      const col = i*3-(row*4)
      cpu.id = "cpu" + i;
      cpu.style = `display: grid; 
                   max-height: 250px; 
                   max-width: 100%;
                   grid-row-start: ${row+2};
                   grid-row-end: ${row+3};
                   grid-column-start: ${col+1};
                   grid-column-end: ${col+4};`;

      gridContainer.appendChild(cpu);
    }
  }
});
