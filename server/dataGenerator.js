import os from 'node:os';
import { Readable } from 'node:stream';

function formatUptime(uptime) {
  let days = Math.floor(uptime / (24 * 60 * 60));
  let hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
  let minutes = Math.floor((uptime % (60 * 60)) / 60);
  let seconds = Math.floor(uptime % 60);

  return `${days.toString().padStart(2, "0")}-${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function getMemoryInfo() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  return {
    "Total Memory": `${(totalMem / 2 ** 30).toFixed(2)} Gb`,
    "Free Memory": `${(freeMem / 2 ** 30).toFixed(2)} Gb`,
    "Usage Memory": `${((freeMem / totalMem) * 100).toFixed(2)} %`,
  };
}

function getCpuUsage() {
  return new Promise((resolve) => {
    let startMeasure = os.cpus();

    setTimeout(() => {
      let endMeasure = os.cpus();

      let percentages = [];

      for (let i = 0; i < startMeasure.length; i++) {
        let oldTimes = startMeasure[i].times;
        let newTimes = endMeasure[i].times;

        let oldTotal = Object.values(oldTimes).reduce((a, b) => a + b);
        let newTotal = Object.values(newTimes).reduce((a, b) => a + b);

        let totalDiff = newTotal - oldTotal;
        let idleDiff = newTimes.idle - oldTimes.idle;

        let percentageCPU = 1 - idleDiff / totalDiff;

        percentages.push({
          name: startMeasure[i].model,
          usage: `${(percentageCPU * 100).toFixed(2)}%`,
          speed: endMeasure[i].speed,
        });
      }
      resolve(percentages);
    }, 500);
  });
}

async function getSystemInfo() {
  const cpuUsage = await getCpuUsage();
  return {
    Platform: os.platform(),
    "Temp_Directory_Path": os.tmpdir(),
    "Home_Directory_Path": os.homedir(),
    "Host_Name": os.hostname(),
    "OS_Type": os.type(),
    "OS_Platform": os.platform(),
    "OS_Architecture": os.arch(),
    "OS_Release": os.release(),
    "OS_Uptime": formatUptime(os.uptime()),
    ...getMemoryInfo(),
    "Load Averages": os.loadavg(),
    "CPU_Usage": cpuUsage,
  };
}
class SystemInfoStream extends Readable {
  constructor(options) {
    super(options);
    this._interval = null;
  }

  _read() {
    if (!this._interval) {
      this._interval = setInterval(async () => {
        const systemInfo = await getSystemInfo();
        if (!this.push(JSON.stringify(systemInfo))) {
          clearInterval(this._interval);
          this._interval = null;
        }
      }, 500);
    }
  }

  _destroy() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
}

export default SystemInfoStream;
