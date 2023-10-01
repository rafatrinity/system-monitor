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
                    object-fit: contain;
                    grid-row-start: 1;`,

  cpuContainer: `display: grid;
                    grid-column-start: 1;
                    grid-column-end: 3;
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 10px;
                    grid-row-gap: 1em;
                    align-content: center;
                    object-fit: contain;
                    grid-row-start: 1;`,
};

export const createElement = (type, id, style) => {
  let element = document.createElement(type);
  element.id = id;
  element.style = style;
  return element;
};

start.addEventListener("click", () => {
  let gridContainer = document.getElementById("gridContainer");
  if (!gridContainer) {
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
  }
});
