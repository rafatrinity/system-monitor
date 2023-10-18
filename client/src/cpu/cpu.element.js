const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

start.addEventListener("click", async () => {
  while (!window?.chunk?.CPU_Usage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const gridContainer = document.getElementById("gridContainer");
  let col = 1;
  let row = 3;
  for (let i = 0; i < window.chunk?.CPU_Usage?.length; i++) {
    if (!document.getElementById("cpu" + i)) {
      const cpu = document.createElement("canvas");

     
      cpu.id = "cpu" + i;
      cpu.style = `display: grid; 
                   max-height: 25vh; 
                   max-width: 100%;
                   width: 100%;
                   grid-row-start: ${row};
                   grid-row-end: ${row + 2};
                   grid-column-start: ${col};
                   grid-column-end: ${col + 3};`;

      if(col > 9){
        col = 1;
        row = row + 2;
      }
      else col = col+3;

      gridContainer.appendChild(cpu);
    }
  }
});
