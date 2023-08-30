const { body } = require('express-validator');

exports.shablonDoctor = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 4, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('doctor_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting')
];