import os from 'node:os';
import { Readable } from 'node:stream';

/**
 * Formata o tempo de atividade do sistema operacional.
 *
 * @param {number} uptime - O tempo de atividade do sistema operacional em segundos.
 * @returns {string} O tempo de atividade formatado no formato DD-HH:MM:SS.
 */
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

/**
 * Obtém informações sobre a memória do sistema.
 *
 * @returns {Object} Um objeto contendo informações sobre a memória total, memória livre e uso de memória.
 */
function getMemoryInfo() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  return {
    Total_Memory: `${(totalMem / 2 ** 30).toFixed(2)} Gb`,
    Free_Memory: `${(freeMem / 2 ** 30).toFixed(2)} Gb`,
    Usage_Memory: `${(((totalMem - freeMem) / totalMem) * 100).toFixed(2)} %`,
  };
}

/**
 * Obtém o uso da CPU.
 *
 * @returns {Promise<Array>} Uma promessa que resolve com um array contendo informações sobre o uso da CPU.
 */
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

/**
 * Obtém informações sobre o sistema.
 *
 * @returns {Promise<Object>} Uma promessa que resolve com um objeto contendo várias informações sobre o sistema.
 */
async function getSystemInfo() {
  const cpuUsage = await getCpuUsage();
  return {
    Platform: os.platform(),
    Temp_Directory_Path: os.tmpdir(),
    Home_Directory_Path: os.homedir(),
    Host_Name: os.hostname(),
    OS_Type: os.type(),
    OS_Platform: os.platform(),
    OS_Architecture: os.arch(),
    OS_Release: os.release(),
    OS_Uptime: formatUptime(os.uptime()),
    ...getMemoryInfo(),
    Load_Averages: os.loadavg(),
    CPU_Usage: cpuUsage,
  };
}

/**
 * Classe que estende Readable para fornecer um fluxo de informações do sistema.
 */
class SystemInfoStream extends Readable {
  /**
   * Construtor para a classe SystemInfoStream.
   *
   * @param {Object} options - As opções para o fluxo legível.
   */
  constructor(options) {
    super(options);
    this._interval = null;
  }

  /**
   * Método _read implementado para fornecer os dados do fluxo.
   */
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

  /**
   * Método _destroy implementado para limpar qualquer recurso quando o fluxo é destruído.
   */
  _destroy() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
}

export default SystemInfoStream;
