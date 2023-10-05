const HttpException = require("../../utils/HttpException.utils");
// const status = require('../../utils/status.utils')
const kirish_basseynModel = require("../../models/kirish_bassen.model");
const kirish_basseyn = require("../../models/register_bassen.model");
const Register_kassaModel = require("../../models/register_kassa.model");
const { validationResult } = require("express-validator");

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class kirish_basseynController {
  getAll = async (req, res, next) => {
    const model = await kirish_basseynModel.findAll();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };

  kirish = async (req, res, next) => {
    let body = req.body,
      date = Math.floor(new Date().getTime() / 1000),
      filial_id = req.currentUser.filial_id;
    let summa,
      sum = 0;
    summa = await kirish_basseynModel.findOne({
      where: { id: 1 },
    });
    let main_sum = Number(summa.dataValues.price);
    let person_sum = Number(body.odam_soni);
    console.log(main_sum)
    console.log(person_sum)
    sum += main_sum * person_sum;
    let model = await kirish_basseyn.create({
      date_time: date,
      type: "Naqt",
      price: person_sum > 0 ? main_sum * person_sum : 0,
      odam_soni: person_sum,
      doc_type: "kirim",
    });
    let kassa = {
      date_time: date,
      type: 0,
      price: sum,
      pay_type: "Naqt",
      doc_type: "kirim",
      doctor_id: model.id,
      place: "Bassen",
      filial_id: filial_id,
    };
    await Register_kassaModel.create(kassa);
    res.send(model);
  };

  getOne = async (req, res, next) => {
    const model = await kirish_basseynModel.findOne({
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
    const model = await kirish_basseynModel.create(req.body);
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar qo'shildi",
      data: model,
    });
  };

  update = async (req, res, next) => {
    this.checkValidation(req);
    const model = await kirish_basseynModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    model.price = req.body.price;
    model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar tahrirlandi",
      data: model,
    });
  };

  delete = async (req, res, next) => {
    const model = await kirish_basseynModel.destroy({
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
module.exports = new kirish_basseynController();
