
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const Doctor_categoryModel = require('../../models/doctor_category.model')
const { validationResult } = require('express-validator');
const filialModel = require('../../models/filial.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class DoctorController {
    getAll = async (req, res, next) => { 
        const model = await Doctor_categoryModel.findAll({
            include:[
                {model: filialModel, as: 'filial'}
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
        const model = await Doctor_categoryModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: filialModel, as: 'filial'}
            ]
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

    filialDoctorBolim = async(req,res,next) => {
        let body = req.body;
        const model = await Doctor_categoryModel.findAll({
            where:{filial_id: body.filial_id}
        })
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Filial boyicha bolimlar',
            data: model
        });
    }

   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await Doctor_categoryModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await Doctor_categoryModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.price = req.body.price;
    model.filial_id = req.body.filial_id;
    model.citizen_price = req.body.citizen_price
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model =  await Doctor_categoryModel.destroy({
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
        message: 'malumot ochirildi',
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
module.exports = new DoctorController;