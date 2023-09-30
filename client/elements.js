const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
const styles = {
  gridContainer: `display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-column-gap: 10px;
                    grid-row-gap: 1em;
                    align-content: center;
                    object-fit: contain;`,
  memoryContainer: `display: grid;
                    grid-column-start: 3;
                    grid-column-end: 4;
                    align-content: center;
                    object-fit: contain;`,
  cpuContainer: `display: grid;
                    grid-column-start: 1;
                    grid-column-end: 3;
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 10px;
                    grid-row-gap: 1em;
                    align-content: center;
                    object-fit: contain;`,
};

const createElement = (type, id, style) => {
  let element = document.createElement(type);
  element.id = id;
  element.style = style;
  return element;
};

setInterval(myTimer, 1000);

function myTimer() {
  document.getElementById("upTime").innerHTML = `OS_Uptime: ${window?.chunk?.OS_Uptime}`;
}

start.addEventListener("click", async () => {
  let gridContainer = document.getElementById("gridContainer");
  if (!gridContainer) {
    while (!window?.chunk?.CPU_Usage) {
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

    let cpuContainer = createElement(
      "div",
      "cpuContainer",
      styles.cpuContainer
    );
    gridContainer.appendChild(cpuContainer);

    let upTime = createElement(
      "div",
      "upTime",
      "margin-left: auto;color: aliceblue;"
    );
    let osType = createElement(
      "div",
      "osType",
      "margin-left: auto;color: aliceblue;"
    );
    
    let nav = document.getElementById("nav");
    osType.innerHTML = `Os Type:${window.chunk.OS_Type}`;
    nav.appendChild(osType);
    nav.appendChild(upTime);

    let cpuAvg = document.createElement("canvas");
    cpuAvg.id = "cpuAvg";
    cpuAvg.style = `grid-column-start: 1;
                  grid-column-end: 3;
                  grid-row-start: 1;
                  grid-row-end: 3;
                  display: grid;
                  object-fit: contain;
                  max-height: 300px;`;
    cpuContainer.appendChild(cpuAvg);

    for (let i = 0; i < window.chunk?.CPU_Usage?.length; i++) {
      let cpu = document.createElement("canvas");
      cpu.id = "cpu" + i;
      cpu.style = `display: grid; max-height: 150px; max-width: 100%;`;
      cpuContainer.appendChild(cpu);
    }
  }
});
