import { TAMX, PROB_ENEMY_SHIP } from "./config.js"
import { space } from "./space.js"

let dificuldade = 1;

export function aumentarDificuldade() {
  dificuldade += 0.2;
  console.log("Dificuldade atual:", dificuldade.toFixed(2)); // 👈 log para você acompanhar
}

export function getDificuldade() {
  return dificuldade;
}

export function resetarDificuldade() {
  dificuldade = 1;
}

const tiposInimigos = [
  {
    nome: "enemyShip",
    imagem: "/assets/png/enemyShip.png",
    pontos: 50,
    velocidade: [1, 3]
  },
  {
    nome: "ufo",
    imagem: "assets/png/enemyUFO.png",
    pontos: 20,
    velocidade: [2, 4]
  },
  {
    nome: "asteroideGrande",
    imagem: "assets/png/meteorBig.png",
    pontos: 10,
    velocidade: [1, 2]
  },
  {
    nome: "asteroidePequeno",
    imagem: "assets/png/meteorSmall.png",
    pontos: 100,
    velocidade: [3, 6]
  }
];

class EnemyShip {
  constructor(tipo) {
    this.tipo = tipo; 

    this.element = document.createElement("img");
    this.element.className = "enemy-ship " + tipo.nome;
    this.element.src = tipo.imagem;

    this.element.style.top = "-20px";
    this.element.style.left = `${Math.random() * (TAMX - 40)}px`;

  
    const [minSpeed, maxSpeed] = tipo.velocidade;
    this.speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * getDificuldade();

    space.element.appendChild(this.element);
  }

  move() {
    const currentTop = parseFloat(this.element.style.top) || 0;
    this.element.style.top = `${currentTop + this.speed}px`;
  }
}

export const enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) {
  const type = tiposInimigos[Math.floor(Math.random() * tiposInimigos.length)];
  enemyShips.push(new EnemyShip(type));
}
}

export const moveEnemyShips = () => {
  for (let i = enemyShips.length - 1; i >= 0; i--) {
    const inimigo = enemyShips[i];
    inimigo.move();

    const topAtual = parseFloat(inimigo.element.style.top);
    const alturaMaxima = 900; 

    if (topAtual > alturaMaxima) {
      inimigo.element.remove();
      enemyShips.splice(i, 1);
    }
  }
};

// export { enemyShips };