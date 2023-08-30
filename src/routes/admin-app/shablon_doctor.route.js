const express = require('express');
const router = express.Router();
const shablonController = require('../../controllers/admin-app/shablon_doctor.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {shablonDoctor}  = require('../../middleware/validators/admin-app/shablonDoctorValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(shablonController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(shablonController.getOne));
router.post('/create',auth(), shablonDoctor, awaitHandlerFactory(shablonController.create));
router.post('/shablonOne',auth(), shablonDoctor, awaitHandlerFactory(shablonController.shablonDoctor));
router.patch('/update/:id', auth(), shablonDoctor, awaitHandlerFactory(shablonController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(shablonController.delete));
module.exports = router;