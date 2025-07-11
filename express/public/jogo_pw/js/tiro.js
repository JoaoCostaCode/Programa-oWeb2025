import { space } from "./space.js"
import { enemyShips } from "./enemyShip.js"
import { updateScore } from "./game.js" 

const tiros = []

export function criarTiro(xInicial) {
  const tiro = document.createElement("img")
  tiro.src = "/jogo_pw/assets/png/laserRed.png"
  tiro.className = "tiro"
  tiro.style.position = "absolute"
  tiro.style.bottom = "50px"
  tiro.style.left = `${xInicial}px`
  space.element.appendChild(tiro)

  tiros.push({ element: tiro, velocidade: 6 })
}

export function moverTiros() {
  for (let i = tiros.length - 1; i >= 0; i--) {
    const tiro = tiros[i]
    const posAtual = parseInt(tiro.element.style.bottom)
    const novaPos = posAtual + tiro.velocidade
    tiro.element.style.bottom = `${novaPos}px`


    if (novaPos > 600) {
      tiro.element.remove()
      tiros.splice(i, 1)
      continue
    }

  
    for (let j = enemyShips.length - 1; j >= 0; j--) {
      const inimigo = enemyShips[j]
      const tiroRect = tiro.element.getBoundingClientRect()
      const inimigoRect = inimigo.element.getBoundingClientRect()

      const colidiu = !(
        tiroRect.right < inimigoRect.left ||
        tiroRect.left > inimigoRect.right ||
        tiroRect.bottom < inimigoRect.top ||
        tiroRect.top > inimigoRect.bottom
      )

      if (colidiu) {
  
        if (inimigo.tipo && typeof inimigo.tipo.pontos === "number") {
           updateScore(inimigo.tipo.pontos);
          }else {
            console.warn("Inimigo sem tipo válido:", inimigo);
          }
      
        tiro.element.remove()
        tiros.splice(i, 1)

        inimigo.element.remove()
        enemyShips.splice(j, 1)
        break
      }
    }
  }
}
