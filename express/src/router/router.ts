import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major'
import userController from '../controllers/user'
import { requireAuth } from '../utils/autentica'
import gameController from '../controllers/game'

const router = Router();

router.get('/',requireAuth, mainController.index);

router.get('/sobre', mainController.sobre);
router.get('/lorem/:quant',requireAuth , mainController.loremHandler);

router.get('/hb1',requireAuth , mainController.hb1);
router.get('/hb2', requireAuth ,mainController.hb2);
router.get('/hb3', requireAuth ,mainController.hb3);
router.get('/hb4',requireAuth , mainController.hb4);

router.get('/major',requireAuth , majorController.index)
router.all('/major/create',requireAuth , majorController.create)
router.get('/major/read/:id', requireAuth ,majorController.read)
router.all('/major/update/:id',requireAuth , majorController.update)
router.post('/major/remove/:id',requireAuth , majorController.remove)

router.get('/user/create', userController.create)
router.post('/user/create', userController.create)
router.all('/user/index', requireAuth ,userController.index)
router.get('/user/read/:id',requireAuth , userController.read)
router.get('/user/update/:id',requireAuth , userController.update)
router.post('/user/update/:id',requireAuth , userController.update)
router.get('/user/delete/:id',requireAuth , userController.remove)
router.post('/user/remove/:id',requireAuth ,userController.remove)

router.get('/user/login', userController.showLoginForm)
router.post('/user/login', userController.login);
router.get('/user/logout', requireAuth ,userController.logout)


router.post('/game/save-score', requireAuth, gameController.saveScore)

router.get('/main/ranking', requireAuth, gameController.showRanking);

router.get('/user/password', requireAuth, userController.passwordForm);
router.post('/user/password', requireAuth, userController.changePassword);

export default router;
