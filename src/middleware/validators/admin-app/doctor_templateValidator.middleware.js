const { body } = require('express-validator');

exports.doctor_templateValidate = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('doctor_id')
         .exists()
         .isInt()
         .withMessage('Int tipida kiriting'),
     body('complaint')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('medical_history')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('objective_vision')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('instrumental')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('diagnos')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('procedure')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('recommended')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('concomitant')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
];