import express from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import { logs } from "./utils/logs";
import router from './router/router';
import { engine } from "express-handlebars";
import path from 'path';
import * as helpers from './views/helpers/helpers';
import session from 'express-session';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json())

app.use(logs("completo"));

app.engine('handlebars', engine({
  layoutsDir: `${__dirname}/views/layout`,
  defaultLayout: 'main',
  helpers
}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true})); // antes estava false se der erro muda auqi dnv

app.use(session({
  secret: 'seusegredoaqui',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = (req.session as any).user || null;
  next();
});

app.use('/jogo_pw', express.static(path.join(__dirname, '..', 'public', 'jogo_pw')))



app.use(router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'jogo_pw', 'index.html'))
})


app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
