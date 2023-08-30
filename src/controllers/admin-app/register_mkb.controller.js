const HttpException = require("../../utils/HttpException.utils");
const register_mkbModel = require("../../models/register_mkb.model");
const { validationResult } = require("express-validator");

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class register_mkbController {
  getAll = async (req, res, next) => {
    const model = await register_mkbModel.findAll();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };

  getOne = async (req, res, next) => {
    this.checkValidation(req);
    const model = await register_mkbModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!model) {
      throw new HttpException(404, "berilgan id bo'yicha malumot yo'q");
    }
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumot chiqdi",
      data: model,
    });
  };
  create = async (req, res, next) => {
    this.checkValidation(req);
    const model = await register_mkbModel.create(req.body);
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar qo'shildi",
      data: model,
    });
  };
  update = async (req, res, next) => {
    this.checkValidation(req);
    const model = await register_mkbModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    model.mkb_id = req.body.mkb_id;
    model.registration_id = req.body.registration_id;
    model.patient_id = req.body.patient_id;
    model.doc_id = req.body.doc_id;
    model.datetime = req.body.datetime;
    model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar tahrirlandi",
      data: model,
    });
  };
  delete = async (req, res, next) => {
    const model = await register_mkbModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!model) {
      throw new HttpException(404, "bunday id yoq");
    }
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumot o'chirildi",
      data: model,
    });
  };
  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new register_mkbController();
