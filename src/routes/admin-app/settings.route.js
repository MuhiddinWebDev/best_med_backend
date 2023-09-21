const express = require('express');
const router = express.Router();
const SettingsController = require('../../controllers/admin-app/settings.controller');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const { Schema } = require('../../middleware/validators/admin-app/settingsValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(SettingsController.getAll)); 
router.get('/id/:id', auth(), awaitHandlerFactory(SettingsController.getById));
router.post('/', auth(), Schema, awaitHandlerFactory(SettingsController.create));
router.patch('/id',auth(), Schema, awaitHandlerFactory(SettingsController.update));
router.delete('/id/:id',auth(),awaitHandlerFactory(SettingsController.delete));

module.exports = router;
