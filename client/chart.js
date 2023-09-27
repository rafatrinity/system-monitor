const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

function cpuAvg() {
  let sum = 0;
  for (let i = 0; i < window.CpuUsage?.length; i++) {
    sum = sum + parseFloat(window.CpuUsage[i].usage);
  }
  return sum / window.CpuUsage?.length;
}
start.addEventListener("click", async () => {
  while (!window?.CpuUsage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  for (let i = 0; i < window.CpuUsage?.length; i++) {
    const [R, G, B] = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
    const cpu = window.CpuUsage[i];
    const datasets = [
      {
        label: `${cpu.name} ${i} usage`,
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
        plugins: {
          streaming: { duration: 60000, frameRate: 10  },
        },
        scales: {
          x: {
            type: "realtime",
            realtime: {
              duration: 45000,
              onRefresh: (chart) => {
                chart.data.datasets.forEach((dataset) => {
                  dataset.data.push({
                    x: Date.now(),
                    y: parseFloat(window.CpuUsage[i].usage),
                  });
                });
              },
            },
          },
          y: { beginAtZero: true, type: "linear", min: 0, max: 100 },
        },
      },
    };
    new Chart(document.getElementById("cpu" + i), config);
  }

  const [R, G, B] = [
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
  ];
  const datasets = [
    {
      label: "Avg cpu usage",
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
      plugins: {
        streaming: { duration: 60000, frameRate: 10  },
      },
      scales: {
        x: {
          type: "realtime",
          realtime: {
            onRefresh: (chart) => {
              chart.data.datasets.forEach((dataset) => {
                dataset.data.push({
                  x: Date.now(),
                  y: cpuAvg(),
                });
              });
            },
          },
        },
        y: { beginAtZero: true, type: "linear", min: 0, max: 100 },
      },
    },
  };

  new Chart(document.getElementById("cpuAvg"), config);
});
