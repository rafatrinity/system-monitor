const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
const styles = {
  gridContainer: `display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-column-gap: 10px;
                    grid-row-gap: 1em;
                    width: 98vw;
                    height: 98vh;
                    align-content: center;`,
  memoryContainer: `display: grid;
                    grid-column-start: 3;
                    grid-column-end: 4;
                    width: 100%;
                    height: 100%;
                    align-content: center;`,
  cpuContainer: `display: grid;
                    grid-column-start: 1;
                    grid-column-end: 3;
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 10px;
                    grid-row-gap: 1em;
                    width: 100%;
                    height: 100%;
                    align-content: center;`,
};

const createElement = (type, id, style) => {
  let element = document.createElement(type);
  element.id = id;
  element.style = style;
  return element;
};

start.addEventListener("click", async () => {
  while (!window?.CpuUsage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  let gridContainer = createElement(
    "div",
    "gridContainer",
    styles.gridContainer
  );

  document.body.appendChild(gridContainer);

  let memoryContainer = createElement(
    "div",
    "memoryContainer",
    styles.memoryContainer
  );

  gridContainer.appendChild(memoryContainer);

  let cpuContainer = createElement("div", "cpuContainer", styles.cpuContainer);

  gridContainer.appendChild(cpuContainer);

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

