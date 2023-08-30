const { body } = require('express-validator');

exports.loginValidate = [
   body('login')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 4, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
   body('password')
         .exists()
         .isString()
         .withMessage('password type string')
];