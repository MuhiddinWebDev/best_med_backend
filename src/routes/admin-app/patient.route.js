const express = require('express');
const router = express.Router();
const PatientController = require('../../controllers/admin-app/patientController');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {patientValidate}  = require('../../middleware/validators/admin-app/patientValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(PatientController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(PatientController.getOne));
router.get('/search/:key', auth(), awaitHandlerFactory(PatientController.search));
router.post('/create',auth(), patientValidate , awaitHandlerFactory(PatientController.create));
router.patch('/update/:id', auth(), patientValidate, awaitHandlerFactory(PatientController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(PatientController.delete));
module.exports = router;