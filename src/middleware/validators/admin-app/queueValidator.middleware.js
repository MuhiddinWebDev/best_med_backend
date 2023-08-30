const { body } = require('express-validator');

exports.queueValidate = [
    body('room_id')
        .exists()
        .isInt()
        .withMessage('Int tipida kiriting'),
    body('patient_id')
        .exists()
        .isInt()
        .withMessage('Int tipida kiriting'),
    body('number')
        .exists()
        .isInt()
        .withMessage('Int tipida kiriting'),
    body('date_time')
        .exists()
        .isString()
        .withMessage('String tipida kiriting'),
     body('status')
        .exists()
        .isString()
        .withMessage('string tipida kiriting'),
];