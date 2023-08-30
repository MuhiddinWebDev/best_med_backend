const { body } = require('express-validator');

exports.directModels = [
   body('department_id')
        .exists()
        .isInt()
        .withMessage('string typeda kiriting'),
    body('reagent_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting')
];