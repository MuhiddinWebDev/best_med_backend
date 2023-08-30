const express = require('express');
const router = express.Router();
const soriController = require('../../controllers/admin-app/sori.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/all', auth(),  awaitHandlerFactory(soriController.getAll));
router.get('/one/:id',  awaitHandlerFactory(soriController.getOne));
router.post('/create',auth(), awaitHandlerFactory(soriController.create));
router.post('/kassa',auth(), awaitHandlerFactory(soriController.kassa));
router.post('/yechish',auth(), awaitHandlerFactory(soriController.yechish));
router.post('/kirish',auth(), awaitHandlerFactory(soriController.kirish));
router.post('/hisobot',auth(), awaitHandlerFactory(soriController.hisobot));
router.post('/sverka',auth(), awaitHandlerFactory(soriController.sverka));
router.patch('/update/:id', auth(), awaitHandlerFactory(soriController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(soriController.delete));
module.exports = router;