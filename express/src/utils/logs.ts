import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";

dotenv.config();


export function logs(tipo: "simples" | "completo"){

     const diretorio = process.env.LOG || path.join(__dirname, 'logs');
    const logCaminho = path.join(diretorio, "acesso.log");

    if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio, { recursive: true });
  }

    return(req: Request, res: Response, next:NextFunction) =>{
        if(tipo == 'simples'){
        const log = `[${new Date().toISOString()}] ${req.method} - ${req.url}`;
        fs.appendFile(logCaminho, log + "\n", (err) => {
        if (err) console.error("Erro ao escrever o log:", err);
        });
        next();
        } else{
        const log = `[${new Date().toISOString()} ${req.url} - ${req.method} - ${req.httpVersion} - ${req.get('User-Agent')}]`
        fs.appendFile(logCaminho, log + "\n", (err) => {
        if (err) console.error("Erro ao escrever o log:", err);
        });
        next()
        };
    }
}