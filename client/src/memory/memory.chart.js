import { charts, createLineChart } from '../core/chart.js';

const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

start.addEventListener("click", async () => {
  if (charts.length == 0) {
    while (!document.getElementById("memoryUsage")) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    createLineChart("memoryUsage", "Memory usage", () =>
      parseFloat(window?.chunk?.Usage_Memory)
    );
  }
});
