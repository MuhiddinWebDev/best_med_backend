const express = require('express');
const router = express.Router();
const reagentController = require('../../controllers/admin-app/reagent.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {reagent}  = require('../../middleware/validators/admin-app/ReagentValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(reagentController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(reagentController.getOne));
router.post('/create',auth(), reagent, awaitHandlerFactory(reagentController.create));
router.post('/Hisobot',auth(), reagent, awaitHandlerFactory(reagentController.Hisobot));
router.post('/Sverka',auth(), reagent, awaitHandlerFactory(reagentController.Sverka));
router.patch('/update/:id', auth(), reagent, awaitHandlerFactory(reagentController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(reagentController.delete));
module.exports = router;