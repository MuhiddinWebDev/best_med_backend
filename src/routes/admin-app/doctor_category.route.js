const express = require('express');
const router = express.Router();
const doctor_categoryController = require('../../controllers/admin-app/doctor_category.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {doctor_categoryValidate}  = require('../../middleware/validators/admin-app/doctor_categoryValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(doctor_categoryController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(doctor_categoryController.getOne));
router.post('/create', auth(Role.Admin, Role.Dasturchi, Role.Shifokor), doctor_categoryValidate,  awaitHandlerFactory(doctor_categoryController.create));
router.post('/filial_bolim', auth(),  awaitHandlerFactory(doctor_categoryController.filialDoctorBolim));
router.patch('/update/:id', auth(Role.Admin, Role.Dasturchi, Role.Shifokor), doctor_categoryValidate, awaitHandlerFactory(doctor_categoryController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(doctor_categoryController.delete));
module.exports = router;