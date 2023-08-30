const { body } = require('express-validator');

exports.InspectionsVAlidator = [
body('inspectionChild')
        .exists()
        .withMessage('InspectionChildni to\'ldiring')
        .isArray()
        .withMessage('massiv ko\'rinishida')
];