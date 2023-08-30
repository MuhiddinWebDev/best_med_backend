const express = require('express');
const router = express.Router();
const filialController = require('../../controllers/admin-app/filial.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all',  awaitHandlerFactory(filialController.getAll));
router.get('/one/:id', awaitHandlerFactory(filialController.getOne));
router.post('/create',auth(), awaitHandlerFactory(filialController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(filialController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(filialController.delete));
module.exports = router;