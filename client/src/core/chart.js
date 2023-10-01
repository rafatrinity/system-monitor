const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

export const charts = [];

function getRandomColor() {
  return [
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
  ];
}

export function createLineChart(id, label, usageFunc) {
  const [R, G, B] = getRandomColor();
  const datasets = [
    {
      label: label,
      data: [],
      backgroundColor: `rgba(${R}, ${G}, ${B}, 0.4)`,
      borderColor: `rgba(${R}, ${G}, ${B}, 1)`,
      tension: 0.3,
      borderWidth: 1,
      fill: true,
    },
  ];

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
              chart.data.datasets.forEach((dataset) => {
                dataset.data.push({
                  x: Date.now(),
                  y: usageFunc(),
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

start.addEventListener("click", async () => {
  if (charts.length > 0) {
    charts.forEach((chart) => {
      chart.options.plugins.streaming.pause = false;
    });
  }
});

stop.addEventListener("click", () => {
  if (charts.length > 0) {
    charts.forEach((chart) => {
      chart.options.plugins.streaming.pause = true;
    });
  }
});
