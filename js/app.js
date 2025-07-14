const select = document.getElementById("funcionarioSelect");
const foto = document.getElementById("fotoFuncionario");

const ctxHard = document.getElementById("chartHard").getContext("2d");
const ctxProc = document.getElementById("chartProcessos").getContext("2d");
const ctxSoft = document.getElementById("chartSoft").getContext("2d");

let chartHard, chartProc, chartSoft;

// Preenche dropdown
funcionarios.forEach((f, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = f.nome;
  select.appendChild(option);
});

// Atualiza os três gráficos
function atualizarFuncionario(index) {
  const f = funcionarios[index];
  foto.src = f.linkedin;

  const buildData = (dataset) => ({
    labels: Object.keys(dataset),
    datasets: [{
      label: f.nome,
      data: Object.values(dataset),
      backgroundColor: "rgba(100,149,237,0.2)",
      borderColor: "rgba(100,149,237,1)",
      pointBackgroundColor: "rgba(100,149,237,1)"
    }]
  });

  const options = {
    responsive: true,
    scale: {
      ticks: { beginAtZero: true, max: 10 }
    }
  };

  if (chartHard) chartHard.destroy();
  if (chartProc) chartProc.destroy();
  if (chartSoft) chartSoft.destroy();

  chartHard = new Chart(ctxHard, { type: "radar", data: buildData(f.hard), options });
  chartProc = new Chart(ctxProc, { type: "radar", data: buildData(f.processos), options });
  chartSoft = new Chart(ctxSoft, { type: "radar", data: buildData(f.soft), options });
}

// Inicial
select.addEventListener("change", (e) => atualizarFuncionario(e.target.value));
atualizarFuncionario(0);