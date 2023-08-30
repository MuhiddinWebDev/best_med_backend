const { body } = require('express-validator');

exports.directModels = [
   body('type')
        .exists()
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('price')
         .exists()
         .isDecimal()
         .withMessage('decimal tipida kiriting'),
     body('pastavchik_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting')
];