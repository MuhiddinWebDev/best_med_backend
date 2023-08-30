const express = require('express');
const router = express.Router();
const kassa_orderController = require('../../controllers/admin-app/kassa_order.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {districtValidate}  = require('../../middleware/validators/admin-app/kassa_orderValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(kassa_orderController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(kassa_orderController.getOne));
router.post('/create',auth(), awaitHandlerFactory(kassa_orderController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(kassa_orderController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(kassa_orderController.delete));
module.exports = router;