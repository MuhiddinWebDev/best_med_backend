const express = require('express');
const router = express.Router();
const districtController = require('../../controllers/admin-app/inspection_info.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {districtValidate}  = require('../../middleware/validators/admin-app/districtValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(districtController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(districtController.getOne));
router.post('/create',auth(), districtValidate, awaitHandlerFactory(districtController.create));
router.patch('/update/:id', auth(), districtValidate, awaitHandlerFactory(districtController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(districtController.delete));
module.exports = router;