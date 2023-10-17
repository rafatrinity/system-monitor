/**
 * Botões de início e parada.
 * @type {HTMLElement[]}
 */
const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

/**
 * Array para armazenar os gráficos criados.
 * @type {Array}
 */
export const charts = [];

/**
 * Gera uma cor aleatória.
 *
 * @returns {number[]} Um array contendo três números representando uma cor RGB.
 */
function getRandomColor() {
  return [
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
  ];
}

/**
 * Cria um gráfico de linha.
 *
 * @param {string} id - O ID do elemento do DOM onde o gráfico será criado.
 * @param {string} label - O rótulo para o conjunto de dados do gráfico.
 * @param {Function} usageFunc - A função que retorna o valor a ser plotado no gráfico.
 */
export function createLineChart(id, label, usageFunc, lines = 1) {
  const datasets = [];

  for (let i = 0; i < lines; i++) {
    const [R, G, B] = getRandomColor();
    datasets.push({
      label: label,
      data: [],
      backgroundColor: `rgba(${R}, ${G}, ${B}, 0.4)`,
      borderColor: `rgba(${R}, ${G}, ${B}, 1)`,
      tension: 0.3,
      borderWidth: 1,
      fill: true,
    });
  }

  const config = {
    type: "line",
    data: { datasets },
    options: {
      radius: 0,
      responsive: true,
      plugins: {
        streaming: {
          duration: 60000,
          frameRate: 10,
          refresh: 500,
        },
      },
      scales: {
        x: {
          type: "realtime",
          realtime: {
            onRefresh: (chart) => {
              chart.data.datasets.forEach((dataset, i) => {
                dataset.data.push({
                  x: Date.now(),
                  y: usageFunc(i),
                });
              });
            },
          },
        },
        y: { beginAtZero: true, type: "linear", min: 0, max: 100 },
      },
    },
  };

  charts.push(new Chart(document.getElementById(id), config));
}

// Adiciona um ouvinte de evento ao botão de início para iniciar a atualização dos gráficos.
start.addEventListener("click", async () => {
  if (charts.length > 0) {
    charts.forEach((chart) => {
      chart.options.plugins.streaming.pause = false;
    });
  }
});

// Adiciona um ouvinte de evento ao botão de parada para interromper a atualização dos gráficos.
stop.addEventListener("click", () => {
  if (charts.length > 0) {
    charts.forEach((chart) => {
      chart.options.plugins.streaming.pause = true;
    });
  }
});
