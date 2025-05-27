const fs = require("fs").promises


const soma = async () =>{
    const d1 = await fs.readFile("1.txt")
    const d2 = await fs.readFile("2.txt")
    const d3 = await fs.readFile("3.txt")

    return parseInt(d1) + parseInt(d2) + parseInt(d3)
}

console.log("A")
soma().then((valor) =>{
    console.log(valor)
})
console.log("B")