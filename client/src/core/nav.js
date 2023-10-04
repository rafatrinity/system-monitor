import { createElement } from './elements.js';

/**
 * Atualiza o tempo de atividade do sistema operacional na página.
 */
function myTimer() {
  document.getElementById(
    "upTime"
  ).innerHTML = `OS_Uptime: ${window?.chunk?.OS_Uptime}`;
}

start.addEventListener("click", async () => {
  if (!document.getElementById("upTime")) {
    while (!window?.chunk?.OS_Type) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    let upTime = createElement(
      "div",
      "upTime",
      "margin-left: auto;color: aliceblue;"
    );

    let osType = createElement(
      "div",
      "osType",
      "margin-left: auto;color: aliceblue;"
    );

    const nav = document.getElementById("nav");
    osType.innerHTML = `Os Type:${window.chunk.OS_Type}`;
    nav.appendChild(osType);
    nav.appendChild(upTime);
    setInterval(myTimer, 1000);
  }
});
