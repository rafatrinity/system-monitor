import { charts, createLineChart } from '../core/chart.js';

const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));

start.addEventListener("click", async () => {
  // Check if charts array is empty
  if (charts.length == 0) {
     // Wait for CPU0 element to exist
     while (!document.getElementById("cpu0")) {
       await new Promise((resolve) => setTimeout(resolve, 500));
     }
 
     // Map over CPU usage array and create line charts
     window.chunk?.CPU_Usage.map((cpu, i) => {
       createLineChart(`cpu${i}`, `${cpu.name} ${i} usage`, () =>
         parseFloat(window?.chunk?.CPU_Usage[i].usage)
       );
     });
  }
 });
