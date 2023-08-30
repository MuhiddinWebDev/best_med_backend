const { body } = require('express-validator');

exports.doctorValidate = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('category_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting')
];