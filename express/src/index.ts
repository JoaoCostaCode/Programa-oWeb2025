import express from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import { logs } from "./utils/logs";
import router from './router/router';
import { engine } from "express-handlebars";
import path from 'path';
import * as helpers from './views/helpers/helpers';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;


app.use(express.static(path.join(__dirname, '..', 'public')));


app.use(logs("completo"));

app.engine('handlebars', engine({
  layoutsDir: `${__dirname}/views/layout`,
  defaultLayout: 'main',
  helpers
}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: false}));

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
