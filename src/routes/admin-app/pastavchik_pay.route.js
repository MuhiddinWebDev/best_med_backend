const express = require('express');
const router = express.Router();
const pastavchik_payController = require('../../controllers/admin-app/pastavchik_pay.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {directModels}  = require('../../middleware/validators/admin-app/pastavchik_payValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(pastavchik_payController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(pastavchik_payController.getOne));
router.post('/create',auth(), directModels, awaitHandlerFactory(pastavchik_payController.create));
router.patch('/update/:id', auth(), directModels, awaitHandlerFactory(pastavchik_payController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(pastavchik_payController.delete));
router.post('/PastavchikHisobot', auth(), awaitHandlerFactory(pastavchik_payController.pastavchikHisobot));
router.post('/PastavchikSverka', auth(), awaitHandlerFactory(pastavchik_payController.pastavchikSverka));
router.post('/getPastavchik', auth(), awaitHandlerFactory(pastavchik_payController.getPastavchik));
module.exports = router;