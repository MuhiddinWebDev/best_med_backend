
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const PillModel = require('../../models/pill.model')
const { validationResult } = require('express-validator');
const {Op} = require("sequelize")

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class PillController {
    getAll = async (req, res, next) => {
        const model = await PillModel.findAll({limit: 100});
        
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'malumotlar chiqdi',
            data: model
        });
        
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await PillModel.findOne({
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
            message: 'Malumotlar topildi',
            data: model
        });
    }
    search = async (req, res, next) => {
        let ModelList = await PillModel.findAll({
            attributes: ['id', 'name',
        ],
            where:{ 
                name:{  [Op.like]: '%'+req.body.name+'%'}
            },
            order: [
                ['name', 'ASC']
            ],
            limit:100,
        });
        if(req.body.name == null){
            let model = await PillModel.findAll({
                raw: true,
                limit: 50,
            })
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: model
            });
        }
        else{
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: ModelList
            });
        }
    };
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await PillModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await PillModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model =   await PillModel.destroy({
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
        message: 'Malumotlar o\'chirildi',
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
module.exports = new PillController;