const express = require('express');
const router = express.Router();
const register_mkbController = require('../../controllers/admin-app/register_mkb.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {districtValidate}  = require('../../middleware/validators/admin-app/districtValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(register_mkbController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(register_mkbController.getOne));
router.post('/create',auth(), districtValidate, awaitHandlerFactory(register_mkbController.create));
router.patch('/update/:id', auth(), districtValidate, awaitHandlerFactory(register_mkbController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(register_mkbController.delete));
module.exports = router;