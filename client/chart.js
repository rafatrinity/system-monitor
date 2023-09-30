const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

const charts = [];

function getRandomColor() {
  return [
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
    Math.floor(Math.random() * 156) + 100,
  ];
}

function cpuAvg() {
  let sum = 0;
  for (let i = 0; i < window.chunk?.CPU_Usage?.length; i++) {
    sum = sum + parseFloat(window.chunk?.CPU_Usage[i].usage);
  }
  return sum / window.chunk?.CPU_Usage?.length;
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
  else{
    while (!window?.chunk?.CPU_Usage) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  
    window.chunk?.CPU_Usage.map((cpu, i) =>
      createLineChart("cpu" + i, `${cpu.name} ${i} usage`, () =>
        parseFloat(window.chunk?.CPU_Usage[i].usage)
      )
    );
  
    createLineChart("cpuAvg", "Avg CPU_Usage", cpuAvg);
  }
});

stop.addEventListener("click", () => {
  if (charts.length > 0) {
    charts.forEach((chart) => {
      chart.options.plugins.streaming.pause = true;
    });
  }
});
