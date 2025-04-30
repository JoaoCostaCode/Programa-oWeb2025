function jogar() {
    let pontuacao = 0;
  
    while (true) {
      let jogador = parseInt(prompt("\n1 - Papel\n2 - Pedra\n3 - Tesoura"));
  
      let computador = Math.floor(Math.random() * 3) + 1;
  
      const opcoes = ["", "Papel", "Pedra", "Tesoura"];
      alert(`O computador jogou ${opcoes[computador]}`);
  
      const venceu = (jogador === 1 && computador === 2) || (jogador === 2 && computador === 3) || (jogador === 3 && computador === 1);
  
      if (venceu) {
        pontuacao++;
        alert("Você ganhou!");
      } else {
        alert(`Você perdeu! A sua pontuação foi de ${pontuacao}`);
        break;
      }
    }
  }
  