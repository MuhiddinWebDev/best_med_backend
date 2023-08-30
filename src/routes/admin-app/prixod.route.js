const express = require('express');
const router = express.Router();
const prixod_Controller = require('../../controllers/admin-app/prixod.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {prixod}  = require('../../middleware/validators/admin-app/prixodValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(prixod_Controller.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(prixod_Controller.getOne));
router.post('/create',auth(), prixod, awaitHandlerFactory(prixod_Controller.create));
router.patch('/update/:id', auth(), prixod, awaitHandlerFactory(prixod_Controller.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(prixod_Controller.delete));
module.exports = router;