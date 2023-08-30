const express = require('express');
const router = express.Router();
const Doctor_templateController = require('../../controllers/admin-app/doctor_template.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {doctor_templateValidate}  = require('../../middleware/validators/admin-app/doctor_templateValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(Doctor_templateController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(Doctor_templateController.getOne));
router.post('/create',auth(), doctor_templateValidate, awaitHandlerFactory(Doctor_templateController.create));
router.patch('/update/:id', auth(), doctor_templateValidate, awaitHandlerFactory(Doctor_templateController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(Doctor_templateController.delete));
module.exports = router;