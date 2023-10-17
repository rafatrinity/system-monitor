/**
 * Botões de início e parada.
 * @type {HTMLElement[]}
 */
const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

/**
 * Estilos CSS para os elementos da página.
 * @type {Object}
 */
const styles = {
  gridContainer: `display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-column-gap: 10px;
                    grid-row-gap: 1em;
                    align-content: center;
                    object-fit: contain;`,

  // memoryContainer: `display: grid;
  //                   grid-column-start: 3;
  //                   grid-column-end: 4;
  //                   object-fit: contain;
  //                   grid-row-start: 1;`,

  // cpuContainer: `display: grid;
  //                   grid-column-start: 1;
  //                   grid-column-end: 5;
  //                   grid-template-columns: repeat(4, 1fr);
  //                   grid-column-gap: 10px;
  //                   grid-row-gap: 1em;
  //                   align-content: center;
  //                   object-fit: contain;
  //                   grid-row-start: 1;`,
};

/**
 * Cria um novo elemento DOM com o tipo, id e estilo especificados.
 *
 * @param {string} type - O tipo do elemento a ser criado.
 * @param {string} id - O ID do elemento a ser criado.
 * @param {string} style - O estilo CSS do elemento a ser criado.
 * @returns {HTMLElement} O elemento DOM criado.
 */
export const createElement = (type, id, style) => {
  let element = document.createElement(type);
  element.id = id;
  element.style = style;
  return element;
};

// Adiciona um ouvinte de evento ao botão de início para criar os elementos da página quando clicado.
start.addEventListener("click", () => {
  let gridContainer = document.getElementById("gridContainer");
  if (!gridContainer) {
    let gridContainer = createElement(
      "div",
      "gridContainer",
      styles.gridContainer
    );
    document.body.appendChild(gridContainer);

    // let memoryContainer = createElement(
    //   "div",
    //   "memoryContainer",
    //   styles.memoryContainer
    // );
    // gridContainer.appendChild(memoryContainer);

    // let cpuContainer = createElement(
    //   "div",
    //   "cpuContainer",
    //   styles.cpuContainer
    // );
    // gridContainer.appendChild(cpuContainer);
  }
});
