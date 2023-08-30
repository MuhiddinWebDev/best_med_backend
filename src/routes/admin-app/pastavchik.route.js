const express = require('express');
const router = express.Router();
const pastavchikController = require('../../controllers/admin-app/pastavchik.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {directModels}  = require('../../middleware/validators/admin-app/pastavchikValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(pastavchikController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(pastavchikController.getOne));
router.post('/create',auth(), directModels, awaitHandlerFactory(pastavchikController.create));
router.post('/filial_pas',auth(), awaitHandlerFactory(pastavchikController.filialPastavchik));
router.patch('/update/:id', auth(), directModels, awaitHandlerFactory(pastavchikController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(pastavchikController.delete));
module.exports = router;