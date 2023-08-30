const express = require('express');
const router = express.Router();
const directController = require('../../controllers/admin-app/direct.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {directModels}  = require('../../middleware/validators/admin-app/directValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(directController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(directController.getOne));
router.post('/create',auth(), directModels, awaitHandlerFactory(directController.create));
router.post('/filial_direct',auth(), awaitHandlerFactory(directController.filialDirect));
router.patch('/update/:id', auth(), directModels, awaitHandlerFactory(directController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(directController.delete));
module.exports = router;