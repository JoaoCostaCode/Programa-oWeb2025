import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major'

const router = Router();

router.get('/', mainController.index);
router.get('/sobre', mainController.sobre);
router.get('/lorem/:quant', mainController.loremHandler);

router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get('/major', majorController.index)
router.all('/major/create', majorController.create)
router.get('/major/read/:id', majorController.read)
router.all('/major/update/:id', majorController.update)
router.post('/major/remove/:id', majorController.remove)



export default router;
