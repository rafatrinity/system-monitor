var coluna = document.createElement("div");
coluna.className = "col";
coluna.style="width: 66vw;";
document.body.appendChild(coluna);

const [start, stop] = ["start", "stop"].map((_) => document.getElementById(_));
start.addEventListener("click", async () => {
  while (!window?.CpuUsage) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  for (let i = 0; i < window.CpuUsage?.length; i+=2) {
    var linha = document.createElement("div");
    linha.className = "row";
    linha.style="margin-bottom:1rem; display: inline-block;";
    
    var canvas1 = document.createElement("canvas");
    canvas1.id = "cpu" + i;
    canvas1.style = "width:600px; height: 200px;"
    
    var canvas2 = document.createElement("canvas");
    canvas2.id = "cpu" + (i + 1);
    canvas2.style = "width:600px; height: 200px;"
    
    coluna.appendChild(linha);
    linha.appendChild(canvas1);
    linha.appendChild(canvas2);
  }
});
