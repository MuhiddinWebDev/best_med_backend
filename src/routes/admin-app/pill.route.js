const express = require('express');
const router = express.Router();
const pillController = require('../../controllers/admin-app/pill.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {pillValidate}  = require('../../middleware/validators/admin-app/pillValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(pillController.getAll));
router.post('/search', auth(), awaitHandlerFactory(pillController.search));
router.get('/one/:id', auth(), awaitHandlerFactory(pillController.getOne));
router.post('/create', auth(), pillValidate, awaitHandlerFactory(pillController.create));
router.patch('/update/:id', auth(), pillValidate, awaitHandlerFactory(pillController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(pillController.delete));
module.exports = router;