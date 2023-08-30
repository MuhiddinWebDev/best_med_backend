const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/admin-app/room.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {roomValidate}  = require('../../middleware/validators/admin-app/roomValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(roomController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(roomController.getOne));
router.post('/create', roomValidate, auth(), awaitHandlerFactory(roomController.create));
router.post('/filialById', auth(), awaitHandlerFactory(roomController.filial));
router.patch('/update/:id', roomValidate, auth(), awaitHandlerFactory(roomController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(roomController.delete));
module.exports = router;