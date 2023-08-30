const express = require('express');
const router = express.Router();
const inspectionController = require('../../controllers/admin-app/inspection.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const  {InspectionsVAlidator}  = require('../../middleware/validators/admin-app/InspectionsValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(inspectionController.getAll));
router.get('/filial_inspection', auth(),  awaitHandlerFactory(inspectionController.filialInspection));
router.get('/one/:id', auth(),  awaitHandlerFactory(inspectionController.getOne));
router.post('/create', auth(),InspectionsVAlidator, awaitHandlerFactory(inspectionController.create));
router.post('/filial_ins', auth(), awaitHandlerFactory(inspectionController.filialIns));
router.patch('/update/:id', auth(), InspectionsVAlidator, awaitHandlerFactory(inspectionController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(inspectionController.delete));
module.exports = router;