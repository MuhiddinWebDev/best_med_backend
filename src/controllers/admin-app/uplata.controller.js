
const HttpException = require('../../utils/HttpException.utils');
const UplataModel = require('../../models/uplata.model')
const { validationResult } = require('express-validator');
const Register_kassaModel = require('../../models/register_kassa.model');
const register_doctorModel = require('../../models/register_doctor.model');
const Register_inspectionModel = require('../../models/register_inspection.model');
const userModel = require('../../models/user.model')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class UplateController {
    getAll = async (req, res, next) => {
        const model = await UplataModel.findAll();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    
    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await UplataModel.findOne({
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
        let payUser = await userModel.findOne({
            where: {
                id: req.body.user_id
            }
        })

        const model = await UplataModel.create({
            "name": req.body.name,
            "user_id": req.currentUser.id,
            "doctor_id": req.body.doctor_id,
            "type": req.body.type,
            "date_time": req.body.date_time,
            "price": req.body.price,
        }); 

        let pay_type = null;
        if(req.body.type == 0){
            pay_type = "Naqt"
        }
        else{
            pay_type = "Plastik"
        }

        await  Register_kassaModel.create({
            "date_time": model.date_time,
            "type": req.body.type,
            "price": req.body.price,
            "filial_id": req.currentUser.filial_id,
            "user_id": req.currentUser.id,
            "pay_type": pay_type,
            "doc_type": "chiqim",
            "doctor_id": model.id,
            "place": "Тўлов"
        })

        if(payUser.dataValues.doctor_id != 0){
            register_doctorModel.create({
                "date_time": model.date_time,
                "type": req.body.type,
                "price": req.body.price,
                "doc_id": model.id, 
                "doctor_id": payUser.dataValues.doctor_id,
                "doc_type": 'chiqim',
                "place": "Тўлов"
            })
        } else if(payUser.dataValues.inspection_category_id != 0){
            Register_inspectionModel.create({
                    "date_time": model.date_time,
                    "type": req.body.type,
                    "price": req.body.price,
                    "doc_id": model.id,
                    "user_id": req.body.user_id,
                    "inspection_id": payUser.dataValues.inspection_category_id,
                    "inspection_category": payUser.dataValues.inspection_category_id,
                    "skidka": 0,
                    "doc_type": 'chiqim',
                    "place": "Тўлов",
                    "filial_id": req.currentUser.filial_id
                })
        }
        
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: model
        });
    }
    
    update = async (req, res, next) => {
        let data = Math.floor(new Date().getTime() / 1000);
        let payUser = await userModel.findOne({
            where: {
                id: req.body.user_id
            }
        })

        this.checkValidation(req);
        
        const model = await UplataModel.findOne({
            where:{
                id: req.params.id
            }
        });

        model.name = req.body.name;
        model.user_id = req.currentUser.id;
        model.doctor_id = req.body.doctor_id;
        model.price = req.body.price;
        model.type = req.body.type;
        model.date_time = req.body.date_time;
        model.save();

        await Register_kassaModel.destroy({
            where:{
                doctor_id: req.params.id,
                doc_type: 'chiqim',
            }
        })

        await register_doctorModel.destroy({
            where:{
                doctor_id: req.params.id,
                doc_type: 'chiqim',
            }
        })

        await Register_inspectionModel.destroy({
            where:{
                doc_id: req.params.id,
                doc_type: 'chiqim'
            }
        })

       
        let pay_type = null;
       
        if(req.body.type == 0){
          pay_type = "Naqt"
        }
        else{
        pay_type = "Plastik"
        }
     
        await  Register_kassaModel.create({
            "date_time": model.date_time,
            "type": req.body.type,
            "price": req.body.price,
            "filial_id": req.currentUser.filial_id,
            "user_id": req.currentUser.id,
            "pay_type": pay_type,
            "doc_type": "chiqim",
            "doctor_id": model.id,
            "place": "Тўлов"
        })

        if(payUser.dataValues.doctor_id != 0){
            register_doctorModel.create({
                "date_time": model.date_time,
                "type": req.body.type,
                "price": req.body.price,
                "doc_id": model.id, 
                "doctor_id": payUser.dataValues.doctor_id,
                "doc_type": 'chiqim',
                "place": "Тўлов"
            })
        } else if(payUser.dataValues.inspection_category_id != 0){
            Register_inspectionModel.create({
                    "date_time": model.date_time,
                    "type": req.body.type,
                    "price": req.body.price,
                    "doc_id": model.id,
                    "user_id": req.body.user_id,
                    "inspection_id": payUser.dataValues.inspection_category_id,
                    "inspection_category": payUser.dataValues.inspection_category_id,
                    "skidka": 0,
                    "doc_type": 'chiqim',
                    "place": "Тўлов",
                    "filial_id": req.currentUser.filial_id
            })
        }
        
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }

    delete = async (req, res, next) => {
        const model = await UplataModel.destroy({
            where:{
                id: req.params.id
            }
        });
        
        await Register_kassaModel.destroy({
            where:{
                doctor_id: req.params.id,
                doc_type: 'chiqim',
            }
        })

        await register_doctorModel.destroy({
            where:{
                doctor_id: req.params.id,
                doc_type: 'chiqim',
            }
        })

        await Register_inspectionModel.destroy({
            where:{
                doc_id: req.params.id,
                doc_type: 'chiqim'
            }
        })

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
module.exports = new UplateController;