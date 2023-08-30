const express = require('express');
const router = express.Router();
const med_directController = require('../../controllers/admin-app/med_direct.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {directModels}  = require('../../middleware/validators/admin-app/directValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(med_directController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(med_directController.getOne));
router.post('/create',auth(), directModels, awaitHandlerFactory(med_directController.create));
router.patch('/update/:id', auth(), directModels, awaitHandlerFactory(med_directController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(med_directController.delete));
module.exports = router;