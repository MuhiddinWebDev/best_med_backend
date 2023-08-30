
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const pastavchikModel = require('../../models/pastavchik.model');

const { validationResult } = require('express-validator');
const filialModel = require('../../models/filial.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class pastavchikController {

    filialPastavchik = async(req, res, next) => {
        const model =  await pastavchikModel.findAll({
            where:{
                filial_id: req.body.filial_id
            },
            include:[
                {model: filialModel, as: 'filial'}
            ]
        })
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getAll = async (req, res, next) => {
        const model = await pastavchikModel.findAll({
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
        const model = await pastavchikModel.findOne({
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
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await pastavchikModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await pastavchikModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.filial_id = req.body.filial_id;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await pastavchikModel.destroy({
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
module.exports = new pastavchikController;