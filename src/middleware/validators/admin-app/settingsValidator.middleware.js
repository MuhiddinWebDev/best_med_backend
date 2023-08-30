const { body } = require("express-validator");

exports.Schema = [
  body("name")
    .exists()
    .withMessage("name bo'lishi kerak")
    .isString()
    .withMessage("name matn bo'lishi kerak"),
    body("date1").exists().withMessage("boshlanish sanasi bo'lishi kerak"),
    body("date2").exists().withMessage("tugash sanasi bo'lishi kerak"),
];
