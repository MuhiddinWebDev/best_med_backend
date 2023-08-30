const { body } = require('express-validator');

exports.prixod = [
   body('pastavchik_id')
        .exists()
        .isInt()
        .withMessage('INt typeda kiriting')
];