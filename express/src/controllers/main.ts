import { Request, Response } from 'express';
import { LoremIpsum } from "lorem-ipsum";
import createError from 'http-errors';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const index = (req: Request, res: Response) => {
 res.render("main/jogo",{
 })
};

const sobre = (req: Request, res: Response) => {
  res.render('main/sobre', {
    title: 'Sobre o jogo - Space Shooter'
  });
};

const loremHandler = (req: Request, res: Response) => {
  const quantidade = Number(req.params.quant)
  
      if( quantidade >= 1){
          const texto = lorem.generateParagraphs(quantidade);
          res.render("main/lorem", {
          texto,
          title: "Lorem Ipsum Gerado"
        });
      } else{
          throw createError(400, 'Requisição inválida');
      }
};

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', {
    mensagem: 'Universidade do Estado do Amazonas'
  });
};

const hb2 = (req: Request, res: Response) =>{
 res.render('main/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework'
 });
}

const hb3 = (req: Request, res: Response) =>{
    const profes = [
 { nome: 'David Fernandes', sala: 1238 },
 { nome: 'Horácio Fernandes', sala: 1233 },
 { nome: 'Edleno Moura', sala: 1236 },
 { nome: 'Elaine Harada', sala: 1231 }
 ];
 res.render('main/hb3', { profes});
}

const hb4 = (req: Request, res: Response) =>{
    const technologies = [
 { name: 'Express', type: 'Framework', poweredByNodejs: true },
 { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
 { name: 'React', type: 'Library', poweredByNodejs: true },
 { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
 { name: 'Django', type: 'Framework', poweredByNodejs: false },
 { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
 { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];
 res.render('main/hb4', { technologies });
}

export default {
  index,
  sobre,
  loremHandler,
  hb1,
  hb2,
  hb3,
  hb4
};