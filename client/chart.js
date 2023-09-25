const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
start.addEventListener("click", async () => {
  while (!window?.CpuUsage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  for (let i = 0; i < window.CpuUsage?.length; i++) {
    const cpu = window.CpuUsage[i];
    const [R, G, B] = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
    const datasets=[{
      label: `${cpu.name} ${i} usage`,
      data: [],
      backgroundColor: `rgba(${R}, ${G}, ${B}, 0.4)`,
      borderColor: `rgba(${R}, ${G}, ${B}, 1)`,
      tension: 0.2,
      borderWidth: 1,
      fill: true,
    }];

    const config = {
      type: "line",
      data: {datasets},
      options: {
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
          y: { beginAtZero: true, type: "linear" },
        },
      },
    };
    console.log(parseFloat(window.CpuUsage[i].usage));
    new Chart(document.getElementById("cpu"+i), config);
  }

});
