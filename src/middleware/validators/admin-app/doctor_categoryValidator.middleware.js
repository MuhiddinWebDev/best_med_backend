const { body } = require('express-validator');

exports.doctor_categoryValidate = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('price')
         .exists()
         .isDecimal()
         .withMessage('decimal tipida kiriting')
];