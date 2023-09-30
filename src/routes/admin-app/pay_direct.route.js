const express = require('express');
const router = express.Router();
const PayDirectController = require('../../controllers/admin-app/pay_direct.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all', auth(), awaitHandlerFactory(PayDirectController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(PayDirectController.getOne));
router.post('/create',auth(), awaitHandlerFactory(PayDirectController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(PayDirectController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(PayDirectController.delete));

// Vakil qarzdorligi
router.post('/getDirect', auth(), awaitHandlerFactory(PayDirectController.getDirect));

module.exports = router;