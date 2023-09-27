const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

function getRandomColor() {
  return [
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
  ];
}

function cpuAvg() {
  let sum = 0;
  for (let i = 0; i < window.CpuUsage?.length; i++) {
    sum = sum + parseFloat(window.CpuUsage[i].usage);
  }
  return sum / window.CpuUsage?.length;
}

function createLineChart(id, label, usageFunc) {
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
          pause: window?.pause || false,
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

  new Chart(document.getElementById(id), config);
}

start.addEventListener("click", async () => {
  while (!window?.CpuUsage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  window.CpuUsage.map((cpu, i) =>
    createLineChart("cpu" + i, `${cpu.name} ${i} usage`, () =>
      parseFloat(window.CpuUsage[i].usage)
    )
  );

  createLineChart("cpuAvg", "Avg cpu usage", cpuAvg);
});
