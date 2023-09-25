const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
start.addEventListener('click', _=>{
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };
  
  const config = {
    type: "line",
    data,
    options: {
      scales: {
        x: {
          type: "realtime",
          realtime: {
            onRefresh: (chart) => {
              chart.data.datasets.forEach((dataset) => {
                dataset.data.push({
                  x: Date.now(),
                  y: window.FreeMemory
                });
              });
            },
          },
        },
        y: { beginAtZero: true },
      },
    },
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
})
