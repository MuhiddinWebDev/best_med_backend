
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const inspection_infoModel = require('../../models/inspection_info.model')
const { validationResult } = require('express-validator');
const inschild = require('../../models/inspection_info_child.model');
const inschild2 = require('../../models/inspection_info_child2.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class inspection_infoController {
    getAll = async (req, res, next) => {
        const model = await inspection_infoModel.findAll({
            include:[
                {model: inschild, as: 'inspection_child', 
            include:[
                {model: inschild2, as: 'inspection_child2'}
            ]
            }
            ]
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await inspection_infoModel.findOne({
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
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await inspection_infoModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await inspection_infoModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =   await inspection_infoModel.destroy({
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
        message: 'malumot o\'chirildi',
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
module.exports = new inspection_infoController;