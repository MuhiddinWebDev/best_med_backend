const { body } = require('express-validator');

exports.validateLogin = [
   body('user_name')
        .exists()
        .withMessage('user_name toldiring')
     //    .isString()
     //    .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 3 ta harfdan iborat bolsin'),
    body('password')
         .exists()
         .isString()
         .withMessage('parol string tipida'),
    body('token')
         .optional()
         .isString()
         .withMessage('token string tipida'),
    body('role')
         .exists()
         .isString()
         .withMessage('role string tipida'),
    body('room_id')
         .exists()
         .isInt()
         .withMessage('room_id integer'),
    body('doctor_id')
         .optional()
         .isInt()
         .withMessage('doctor_id integer'),
    body('inspection_category_id')
         .exists()
         .optional()
         .withMessage('inspection_category_id integer'),
    body('pay_type')
         .optional()
         .isString()
         .withMessage('pay_type string tipida'),
    body('salary')
         .optional()
         .isDecimal()
         .withMessage('salary decimal tipida'),
];