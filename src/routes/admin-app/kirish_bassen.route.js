const express = require('express');
const router = express.Router();
const BassenController = require('../../controllers/admin-app/bassen_summa.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/all', auth(),  awaitHandlerFactory(BassenController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(BassenController.getOne));
router.post('/create',auth(), awaitHandlerFactory(BassenController.create));
router.post('/kirish',auth(), awaitHandlerFactory(BassenController.kirish));
router.patch('/update/:id', auth(), awaitHandlerFactory(BassenController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(BassenController.delete));
module.exports = router;