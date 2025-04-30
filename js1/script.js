for (let i = 1; i <= 10; i++) {
    const container = document.createElement("div");
    container.className = "container-tabela";
  
    const tabela = document.createElement("table");
  
    const cabecalho = document.createElement("thead");
    const th = document.createElement("th");
    th.colSpan = 2;
    th.textContent = `Produtos de ${i}`;
    cabecalho.appendChild(th);
    tabela.appendChild(cabecalho);
  
    const corpo = document.createElement("tbody");
  
    for (let j = 1; j <= 10; j++) {
      const linha = document.createElement("tr");
  
      const expressao = document.createElement("td");
      expressao.textContent = `${i}x${j}`;
  
      const resultado = document.createElement("td");
      resultado.textContent = i * j;
  
      linha.appendChild(expressao);
      linha.appendChild(resultado);
      corpo.appendChild(linha);
    }
  
    tabela.appendChild(corpo);
    container.appendChild(tabela);
    document.body.appendChild(container);
  }
  