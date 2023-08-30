
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const departmentModel = require('../../models/department.model')
const { validationResult } = require('express-validator');
const register_departmentModel = require('../../models/register_reagent.model');
const { sequelize } = require('../../models/reagent.model');
const {Op} = require('sequelize')

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class departmentController {
    getAll = async (req, res, next) => {
        const model = await departmentModel.findAll(req.body);
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await departmentModel.findOne({
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
        let model  = await register_departmentModel.findAll({
            attributes: [
                'id', "price", "date_time", "doc_id","count", "summa", "reagent_id",
                [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
               [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.reagent_id = ${body.reagent_id} THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ],
           where: queryx
        })
        model.forEach(val => {
            if(val.dataValues.id == null){
                model = [];
                res.send(model)
            }
            else{
                res.send(model)
            }
        })
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await departmentModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await departmentModel.findOne({
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
  const model = await departmentModel.destroy({
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
module.exports = new departmentController;