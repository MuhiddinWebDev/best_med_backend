const express = require('express');
const router = express.Router();
const expenseController = require('../../controllers/admin-app/expense.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {districtValidate}  = require('../../middleware/validators/admin-app/expenseValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(expenseController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(expenseController.getOne));
router.post('/create',auth(), districtValidate, awaitHandlerFactory(expenseController.create));
router.patch('/update/:id', auth(), districtValidate, awaitHandlerFactory(expenseController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(expenseController.delete));
module.exports = router;