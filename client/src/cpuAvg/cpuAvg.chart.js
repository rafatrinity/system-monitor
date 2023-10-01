import { charts, createLineChart } from '../core/chart.js';

const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

function cpuAvg() {
  let sum = 0;
  for (let i = 0; i < window.chunk?.CPU_Usage?.length; i++) {
    sum = sum + parseFloat(window.chunk?.CPU_Usage[i].usage);
  }
  return sum / window.chunk?.CPU_Usage?.length;
}

start.addEventListener("click", async () => {
  if (charts.length == 0) {
    while (!document.getElementById("cpuAvg")) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    createLineChart("cpuAvg", "CPU avg usage", cpuAvg)
  }
});
