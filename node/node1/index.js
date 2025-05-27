const http = require("http")
const fs = require("fs")
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT ?? 6677
const DIR = process.argv[2]

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"text/html;charset=utf8"})
    fs.readdir(DIR, (err, arq) => {
        arq.forEach(f => {
            res.write(`${f}<br>`)
        });
        res.end()
    })
})

server.listen(PORT, () => {
    console.log(`Servidor escutando a porta ${PORT}`)
})