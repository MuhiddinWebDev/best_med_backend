const express = require('express');
const router = express.Router();
const reagentController = require('../../controllers/admin-app/department.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all', auth(),  awaitHandlerFactory(reagentController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(reagentController.getOne));
router.post('/create',auth(), awaitHandlerFactory(reagentController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(reagentController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(reagentController.delete));
module.exports = router;