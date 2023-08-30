const express = require('express');
const router = express.Router();
const reagentDepartmentController = require('../../controllers/admin-app/reagentDepartment.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {directModels}  = require('../../middleware/validators/admin-app/reagentDepartmentValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(reagentDepartmentController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(reagentDepartmentController.getOne));
router.post('/create',auth(), directModels, awaitHandlerFactory(reagentDepartmentController.create));
router.patch('/update/:id', auth(), directModels, awaitHandlerFactory(reagentDepartmentController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(reagentDepartmentController.delete));
module.exports = router;