
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const reagentModel = require('../../models/reagent.model')
const { validationResult } = require('express-validator');
const register_reagentModel = require('../../models/register_reagent.model');
// const reagentModel = require('../../models.reagent.model')
const { sequelize } = require('../../models/reagent.model');
const {Op} = require('sequelize');
const reagentDepartmentModel = require('../../models/reagent_department.model');
const doctorCategory = require('../../models/doctor_category.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class reagentController {
    getAll = async (req, res, next) => {
        const model = await reagentModel.findAll();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await reagentModel.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
    Hisobot = async(req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.reagent_id !== null){
            query.id = {[Op.eq] : body.reagent_id }  
            queryx.reagent_id = {[Op.eq]: body.reagent_id}
        };
        let model  = await register_reagentModel.findAll({
            attributes: [
                'id', "price", "date_time", "doc_id","count", "summa", "reagent_id", "doc_type",
                [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
               [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'kirim' THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'chiqim' THEN register_reagent.summa ELSE 0 END)`), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ],
            include:[
                {model: reagentDepartmentModel, as: 'reagent_department',
            include:[
                {model: reagentModel, as: 'reagent'},
                // {model: departmentModel, as:'department'}
            ]
            },
            {model: reagentModel, as: 'reagent'}
             ],
           where: queryx,
           group: ['reagent_id']
        })
        res.send(model)
        // model.forEach(val => {
        //     if(val.dataValues.id == null){
        //         model = [];
        //         res.send(model)
        //     }
        //     else{
        //         res.send(model)
        //     }
        // })
    }
    Sverka = async(req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.reagent_id !== null){
            query.id = {[Op.eq] : body.reagent_id }  
            queryx.reagent_id = {[Op.eq]: body.reagent_id}
        };
        let model  = await register_reagentModel.findAll({
            attributes: [
                'id', "price", "date_time", "doc_id","count", "summa", "reagent_id", "doc_type",
                [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
               [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'kirim' THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'chiqim' THEN register_reagent.summa ELSE 0 END)`), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ],
           include:[
            {model: reagentDepartmentModel, as: 'reagent_department',
        include:[
            {model: reagentModel, as: 'reagent'},
            {model: doctorCategory, as:'department'}
        ]
        },
        {model: reagentModel, as: 'reagent'}
         ],
           where: queryx,
           group: ['id']
        })
        res.send(model)
        // model.forEach(val => {
        //     if(val.dataValues.id == null){
        //         model = [];
        //         res.send(model)
        //     }
        //     else{
        //         res.send(model)
        //     }
        // })
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await reagentModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await reagentModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await reagentModel.destroy({
        where:{
          id: req.params.id
        }
    });
    if(!model){
        throw new HttpException(404, "bunday id yoq")
    }
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot o\'chirildi',
        data: model
    });
}
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

   
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new reagentController;