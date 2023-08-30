const express = require('express');
const router = express.Router();
const RegionController = require('../../controllers/admin-app/region.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {regionValidate}  = require('../../middleware/validators/admin-app/regionValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(RegionController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(RegionController.getOne));
router.post('/create',auth(), regionValidate, awaitHandlerFactory(RegionController.create));
router.patch('/update/:id', auth(), regionValidate, awaitHandlerFactory(RegionController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(RegionController.delete));
module.exports = router;