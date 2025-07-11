import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips, enemyShips, aumentarDificuldade, resetarDificuldade } from "./enemyShip.js"
import { criarTiro, moverTiros } from "./tiro.js"
import { TAMX, TAMY } from "./config.js"


// function init() {
//   setInterval(run, 1000 / FPS)
// }

let gameIntervalId = null;
// let dificuldadeIntervalId = null; 
let gameInicia = false;
let gamePausa = false;

function ComecaJogo() {
  if (!gameInicia) {
    gameIntervalId = setInterval(run, 1000 / FPS);
    gameInicia = true;
    console.log("Jogo iniciado");

  setInterval(() => {
  aumentarDificuldade();
}, 60000);
  }
}


function togglePause() {
  if (!gameInicia) return;

  gamePausa = !gamePausa;

  if (gamePausa) {
    clearInterval(gameIntervalId);
    console.log("Jogo pausado");
  } else {
    clearInterval(gameIntervalId); // ← ISSO EVITA intervalos múltiplos
    gameIntervalId = setInterval(run, 1000 / FPS);
    console.log("Jogo despausado");
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
  if (!gameInicia) {
    ComecaJogo();
  } else if (!gamePausa) {
    const posX = ship.element.offsetLeft + ship.element.offsetWidth / 2 - 5
    criarTiro(posX)
  }
}

  if (event.code === 'KeyP') {
    togglePause();
  }

  if (event.key === "ArrowLeft") ship.changeDirection(-1);
  if (event.key === "ArrowRight") ship.changeDirection(+1);
});

export let pontos = 0;
export let vidas = 3;

export function updateScore(aumento = 0) {
  pontos += aumento;
  document.getElementById('pontos').textContent = `Pontuação: ${pontos}`;
}

function updateLives(subtracao = 0) {
  vidas += subtracao;
  if (vidas < 0) vidas = 0;

  const livesContainer = document.getElementById('vidas');
  livesContainer.innerHTML = '';
  for (let i = 0; i < vidas; i++) {
    const lifeIcon = document.createElement('img');
    lifeIcon.src = '/jogo_pw/assets/png/life.png';
    lifeIcon.classList.add('life');
    livesContainer.appendChild(lifeIcon);
  }

  // ⚠️ Se vidas acabarem, já prepara para a próxima regra (game over)
 if (vidas === 0) {
  console.log("Game Over!");
  clearInterval(gameIntervalId);
  document.getElementById("gameOver").style.display = "block";

  // Enviar score via fetch
  fetch('/game/save-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score: pontos })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Score salvo com sucesso!');
    } else {
      console.error('Erro ao salvar score:', data.error);
    }
  })
  .catch(err => {
    console.error('Erro na requisição AJAX:', err);
  });
}
}

function perderVida() {
  ship.danificada = true;

  updateLives(-1);
  ship.element.src = "/jogo_pw/assets/png/playerDamaged.png";

  setTimeout(() => {
    ship.element.src = "/jogo_pw/assets/png/player.png"; // ou `playerLeft.png`/`playerRight.png`, dependendo do seu estado atual
    ship.danificada = false;
  }, 5000); // 5 segundos
}

function reiniciarJogo() {
  // resetar variáveis
  pontos = 0;
  vidas = 3;
  gameInicia = false;
  gamePausa = false;
  ship.danificada = false;

  // resetar HUD
  updateScore(0); // vai somar zero e mostrar "0"
  updateLives(0); // força redesenho das vidas

  // reposicionar nave
  // ship.element.style.top = "520px";
  // ship.element.style.left = `${TAMX / 2 - 50}px`;
  ship.element.style.bottom = "20px"
  ship.element.style.left = `${TAMX / 2 - 50}px`
  ship.direction = 1;
  ship.danificada = false;

  // remover inimigos e tiros
  document.querySelectorAll(".enemy-ship").forEach(e => e.remove());
  document.querySelectorAll(".tiro").forEach(e => e.remove());
  enemyShips.length = 0;

  // esconder tela de game over
  document.getElementById("gameOver").style.display = "none";

  // reiniciar jogo
  resetarDificuldade()
  ComecaJogo();
  
}


function run() {
  space.move()
  ship.move()
  createRandomEnemyShip()
  moveEnemyShips()
  moverTiros()

  for (let i = enemyShips.length - 1; i >= 0; i--) {
  const inimigo = enemyShips[i];

  const naveRect = ship.element.getBoundingClientRect();
  const inimigoRect = inimigo.element.getBoundingClientRect();

  const colidiu = !(
    naveRect.right < inimigoRect.left ||
    naveRect.left > inimigoRect.right ||
    naveRect.bottom < inimigoRect.top ||
    naveRect.top > inimigoRect.bottom
  );

  if (colidiu && !ship.danificada) {
    inimigo.element.remove();
    enemyShips.splice(i, 1);

    perderVida();
  }
}
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnReiniciar").addEventListener("click", reiniciarJogo);
});
