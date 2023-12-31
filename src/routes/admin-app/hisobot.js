const express = require('express');
const router = express.Router();
const hisobotController = require('../../controllers/admin-app/hisobot');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.post('/doctor_hisobot', auth(), awaitHandlerFactory(hisobotController.doctorHisobot));
router.post('/doctor_sverka', auth(), awaitHandlerFactory(hisobotController.DoctorSverka));
router.post('/inspection_hisobot', auth(), awaitHandlerFactory(hisobotController.inspection));
router.post('/inspection_hisobot_salary', auth(), awaitHandlerFactory(hisobotController.inspectionSalary));
router.post('/inspection_sverka', auth(), awaitHandlerFactory(hisobotController.InspectionSverka));
router.post('/direct_hisobot', auth(), awaitHandlerFactory(hisobotController.directHisobot));
router.post('/direct_sverka', auth(), awaitHandlerFactory(hisobotController.directSverka));
router.post('/med_hisobot', auth(), awaitHandlerFactory(hisobotController.medHisobot));
router.post('/med_sverka', auth(), awaitHandlerFactory(hisobotController.medSverka));
router.post('/pastavchik_hisobot', auth(), awaitHandlerFactory(hisobotController.pastavchikHisobot));
router.post('/pastavchik_sverka', auth(), awaitHandlerFactory(hisobotController.pastavchikSverka));
router.post('/reagent_hisobot', auth(), awaitHandlerFactory(hisobotController.Hisobot));
router.post('/reagent_sverka', auth(), awaitHandlerFactory(hisobotController.Sverka));
router.post('/kassa_sverka', auth(), awaitHandlerFactory(hisobotController.kassaSverka));
router.post('/kirish', auth(), awaitHandlerFactory(hisobotController.kirishHisobot));
router.post('/bassen', auth(), awaitHandlerFactory(hisobotController.BassenSverka));
// router.post('/kirish_sverka', auth(), awaitHandlerFactory(hisobotController.kirishHisobot));
// 
router.post('/gender-count', auth(), awaitHandlerFactory(hisobotController.genderCountBemor));
router.post('/countas', auth(), awaitHandlerFactory(hisobotController.countAS));
router.post('/countworker', auth(), awaitHandlerFactory(hisobotController.countWorker));
router.post('/tekshiruv-doktor', auth(), awaitHandlerFactory(hisobotController.countTekshiruvDoktor));
router.post('/tekshiruv-laborant', auth(), awaitHandlerFactory(hisobotController.countTekshiruvLaborant));
router.post('/tekshiruvcount', auth(), awaitHandlerFactory(hisobotController.countKoriklarSoni));

module.exports = router;