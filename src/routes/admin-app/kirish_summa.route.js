const express = require('express');
const router = express.Router();
const kirish_summaController = require('../../controllers/admin-app/kirish_summa.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all', auth(),  awaitHandlerFactory(kirish_summaController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(kirish_summaController.getOne));
router.post('/create',auth(), awaitHandlerFactory(kirish_summaController.create));
router.post('/kirish',auth(), awaitHandlerFactory(kirish_summaController.kirish));
router.patch('/update/:id', auth(), awaitHandlerFactory(kirish_summaController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(kirish_summaController.delete));
module.exports = router;