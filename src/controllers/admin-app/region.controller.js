
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const RegionModel = require('../../models/region.model')
const { validationResult } = require('express-validator');
const districtModel = require('../../models/district.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegionController {
    getAll = async (req, res, next) => {
        const model = await RegionModel.findAll({
            include:[
                {model: districtModel, as: 'district', attributes:['id', 'name']}
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
        const model = await RegionModel.findOne({
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
       const model = await RegionModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await RegionModel.findOne({
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
 const model =   await RegionModel.destroy({
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
module.exports = new RegionController;