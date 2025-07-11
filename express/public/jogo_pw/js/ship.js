import { TAMX } from "./config.js"
import { space } from "./space.js"

const directions = [
  "/jogo_pw/assets/png/playerLeft.png",
  "/jogo_pw/assets/png/player.png",
  "/jogo_pw/assets/png/playerRight.png",
]

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    space.element.appendChild(this.element)
  }
  changeDirection(giro) { // -1 +1
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    this.element.src = directions[this.direction]
  }
 move() {
  const currentLeft = parseInt(this.element.style.left) || 0;
  const shipWidth = this.element.offsetWidth;
  const moveSpeed = 2; // você pode ajustar

  let newLeft = currentLeft;

  if (this.direction === 0) {
    newLeft = currentLeft - moveSpeed;
  } else if (this.direction === 2) {
    newLeft = currentLeft + moveSpeed;
  }

  // Aplicar limites
  const minLeft = 0;
  const maxLeft = TAMX - shipWidth;

  if (newLeft < minLeft) newLeft = minLeft;
  if (newLeft > maxLeft) newLeft = maxLeft;

  this.element.style.left = `${newLeft}px`;
}
}

export const ship = new Ship()

ship.danificada = false;
