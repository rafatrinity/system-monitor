var coluna = document.createElement("div");
coluna.className = "col";
const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
start.addEventListener("click", async () => {
  while (!window?.CpuUsage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  for (let i = 0; i < window.CpuUsage?.length; i++) {
    var linha = document.createElement("div");
    linha.className = "row";

    var canvas1 = document.createElement("canvas");
    canvas1.id = "cpu" + i;
    
    linha.appendChild(canvas1);

    var canvas2 = document.createElement("canvas");
    canvas2.id = "cpu" + (i + 1);
    linha.appendChild(canvas2);

    coluna.appendChild(linha);
  }
  document.body.appendChild(coluna);
});
