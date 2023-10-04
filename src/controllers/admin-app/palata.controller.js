const HttpException = require("../../utils/HttpException.utils");
// const status = require('../../utils/status.utils')
const palataModel = require("../../models/palata.model");
const { validationResult } = require("express-validator");
const register_palataModel = require("../../models/register_palata.model");
const { Op } = require("sequelize");
const moment = require("moment");
const RegistrationModel = require("../../models/registration.model");
const PatientModel = require("../../models/patient.model");
const { sequelize } = require("../../models/patient.model");
const filialModel = require("../../models/filial.model");

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class palataController {
  getAll = async (req, res, next) => {
    const model = await palataModel.findAll({
      include: [{ model: filialModel, as: "filial" }],
    });
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };
  
  getByFilialAll = async (req, res, next) => {
    let { filial_id } = req.body;
    let query = {};
    if(filial_id){
      query.filial_id = filial_id;
    }
    const model = await palataModel.findAll({
      include: [{ model: filialModel, as: "filial" }],
      where: query
    });
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };

  palata = async (req, res, next) => {
    let query = {}, queryx = {};
    let body = req.body;

    if(body.datetime1 || body.datetime2) {
      query.date_time = {
        [Op.gte]: body.datetime1,
        [Op.lte]: body.datetime2,
      };
    }
    
    if (body.filial_id != null) {
      queryx.filial_id = { [Op.eq]: body.filial_id };
    }
    
    let model = await palataModel.findAll({
      include: [
        {
          model: register_palataModel,
          as: "register_palata",
          where: query,
          required: false,
          include: [
            {
              model: RegistrationModel,
              as: "registration",
              required: false,
            },
            {
              model: PatientModel,
              as: "patient",
              attributes: ["id", "fullname"],
              required: false,
            },
          ],
        },
      ],
      where: queryx,
      group: ["id"],
    });
        
    for (let i = 0; i < model.length; i++) {
      if (model[i].dataValues.register_palata.length > 0) {
        for (let key of model[i].dataValues.register_palata) {
           if(key.dataValues.registration != null){
             if (key.dataValues.registration.backlog <= 0) {
               model[i].dataValues.text = "qarz";
             }
            //  else if (key.dataValues.date_do <= bugun && key.dataValues.registration.backlog == 0) {
            //    model[i].dataValues.text = "Пул тўлаган, вақти тугамаган бемор ётипди";
            //  } else if (key.dataValues.date_do <= bugun && key.dataValues.registration.backlog != 0 ) {
            //    model[i].dataValues.text = "Пул тўламаган ва вақти ўтиб кетган";
            //  } else if (key.dataValues.date_do >= bugun && key.dataValues.registration.backlog != 0) {
            //    model[i].dataValues.text = "Пул тўламаган ва вақти ўтиб кетмаган";
            //  }
           }  
        }
      } else {
        model[i].dataValues.text = "Палата бўш";
      }
    }
    res.send(model);
  };

  getOne = async (req, res, next) => {
    this.checkValidation(req);
    const model = await palataModel.findOne({
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
    const model = await palataModel.create(req.body);
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar qoshildi",
      data: model,
    });
  };
  
  update = async (req, res, next) => {
    this.checkValidation(req);
    const model = await palataModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    model.name = req.body.name;
    model.filial_id = req.body.filial_id;
    model.user_id = req.body.user_id;
    (model.price = req.body.price), (model.status = req.body.status);
    model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar tahrirlandi",
      data: model,
    });
  };
  
  delete = async (req, res, next) => {
    const model = await palataModel.destroy({
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
module.exports = new palataController();
