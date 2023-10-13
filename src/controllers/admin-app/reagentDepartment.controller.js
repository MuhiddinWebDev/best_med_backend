const HttpException = require("../../utils/HttpException.utils");
const reagentDepartmentModel = require("../../models/reagent_department.model");
const { validationResult } = require("express-validator");
const reagentModel = require("../../models/reagent.model");
const prixodTableModel = require("../../models/prixod_table.model");
const inspectionCategoryModel = require("../../models/doctor_category.model");
const { Op, Sequelize } = require('sequelize');
const sequelize = require('sequelize');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class reagentDepartmentController {
  getAll = async (req, res, next) => {
    const model = await reagentDepartmentModel.findAll({
      include: [
        { model: reagentModel, as: "reagent" },
        { model: inspectionCategoryModel, as: "department" },
      ],
    });
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };

  getOne = async (req, res, next) => {
    this.checkValidation(req);
    const model = await reagentDepartmentModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: reagentModel, as: "reagent" },
        { model: inspectionCategoryModel, as: "department" },
      ],
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

    const data = {
      filial_id: req.body.filial_id,
      user_id: req.currentUser.id,
      datetime: req.body.datetime,
      department_id: req.body.department_id,
      reagent_id: req.body.reagent_id,
      count: req.body.count,
    };

    const model = await reagentDepartmentModel.create(data);

    let table = {
      doc_id: model.id,
      reagent_id: req.body.reagent_id,
      count: req.body.count,
      user_id: req.currentUser.id,
      datetime: req.body.datetime,
      filial_id: req.body.filial_id,
      place: "Reagent"
    }
    
    await prixodTableModel.create(table)

    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar qo'shildi",
      data: model,
    });
  };

  update = async (req, res, next) => {
    this.checkValidation(req);
    const model = await reagentDepartmentModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    model.filial_id = req.body.filial_id;
    model.user_id = req.currentUser.id;
    model.datetime = req.body.datetime;
    model.department_id = req.body.department_id;
    model.reagent_id = req.body.reagent_id;
    model.count = req.body.count;
    model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar tahrirlandi",
      data: model,
    });
  };

  delete = async (req, res, next) => {
    const model = await reagentDepartmentModel.destroy({
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

  getOstatka = async (req, res) => {
    let id = parseInt(req.params.id)

    const result = await prixodTableModel.findOne({
        where: {
          reagent_id: id
        },
        attributes: [
          'reagent_id', 
          [Sequelize.fn('SUM', Sequelize.col('count')), 'totalCount']  
        ]
    });
  
    const result2 = await reagentDepartmentModel.findOne({
        where: {
          reagent_id: id
        },
        attributes: [
          'reagent_id', 
          [Sequelize.fn('SUM', Sequelize.col('count')), 'totalCount']  
        ]
    });

    // Subtract the counts
    let countDifference = result.dataValues.totalCount - result2.dataValues.totalCount;

    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar tahrirlandi",
      data: countDifference,
    });
  }

  hisobot = async (req, res) => {
    // let model = 
  }
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new reagentDepartmentController();
