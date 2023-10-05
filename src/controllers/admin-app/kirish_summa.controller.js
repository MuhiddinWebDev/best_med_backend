const HttpException = require("../../utils/HttpException.utils");
// const status = require('../../utils/status.utils')
const kirish_summaModel = require("../../models/kirish_summa.model");
const register_kirish = require("../../models/register_kirish.model");
const Register_kassaModel = require("../../models/register_kassa.model");
const { validationResult } = require("express-validator");

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class kirish_summaController {
  getAll = async (req, res, next) => {
    const model = await kirish_summaModel.findAll();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };
  kirish = async (req, res, next) => {
    let body = req.body,
      date = Math.floor(new Date().getTime() / 1000);
      
    let summa,
      sum = 0,
      filial_id = req.currentUser.filial_id;
    summa = await kirish_summaModel.findOne({
      where: { id: 1 },
    });
    console.log(req.currentUser);
    sum +=
      summa.dataValues.odam_price * body.odam_soni +
      summa.dataValues.moshina_price * body.mashina_soni;
    let model = await register_kirish.create({
      date_time: date,
      type: "Naqt",
      price:
        body.odam_soni > 0 ? summa.dataValues.odam_price * body.odam_soni : 0,
      mashina_soni: body.mashina_soni,
      mashina_price:
        body.mashina_soni > 0
          ? summa.dataValues.moshina_price * body.mashina_soni
          : 0,
      odam_soni: body.odam_soni,
      doc_type: "kirim",
    });
    let kassa = {
      date_time: date,
      type: 0,
      price: sum,
      pay_type: "Naqt",
      doc_type: "kirim",
      doctor_id: model.id,
      place: "Kirish",
      filial_id: filial_id,
    };
    await Register_kassaModel.create(kassa);
    res.send(model);
  };
  getOne = async (req, res, next) => {
    const model = await kirish_summaModel.findOne({
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
    const model = await kirish_summaModel.create(req.body);
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar qo'shildi",
      data: model,
    });
  };
  update = async (req, res, next) => {
    this.checkValidation(req);
    const model = await kirish_summaModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    model.odam_price = req.body.odam_price;
    model.moshina_price = req.body.moshina_price;
    model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar tahrirlandi",
      data: model,
    });
  };
  delete = async (req, res, next) => {
    const model = await kirish_summaModel.destroy({
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
module.exports = new kirish_summaController();
