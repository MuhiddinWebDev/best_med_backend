const { body } = require('express-validator');

exports.districtValidate = [
   body('expense_id')
        .exists()
        .isInt()
        .withMessage('Int typeda kiriting'),
    body('pay_type')
         .exists()
         .isInt()
         .withMessage('Int tipida kiriting'),
     body('type')
         .exists()
         .isString()
         .withMessage('string tipida bolsin'),
     body('price')
          .exists()
          .isDecimal()
          .withMessage('decimal tipida kiriting')
];