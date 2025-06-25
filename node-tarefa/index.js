const fs = require('fs')
const http = require('http')
const dir = process.argv[2] || '.'

const port = process.env.PORT || 3333;

const server = http.createServer(function(requisicao, resposta){
    resposta.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    
    fs.readdir(dir, (err, arquivos) =>{
    if (err){
        console.log(err);
        return;
    }
    resposta.write("<ul>");
    arquivos.forEach(arquivos =>{
        resposta.write(`<li>${arquivos}</li>`);
    })
    resposta.write("</ul>");
    resposta.end();
    
})
   
})

server.listen(port)

