
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const QueueModel = require('../../models/queue.model')
const { validationResult } = require('express-validator');
const RoomModel = require('../../models/room.model');
const PatientModel = require('../../models/patient.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class QueueController {
    getAll = async (req, res, next) => {
        const model = await QueueModel.findAll({
            include:[
                {model: RoomModel, as: 'room', attributes: ['id', 'name']},
                {model: PatientModel, as: 'patient', attributes: ['id', 'name']}
            ]
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await QueueModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: RoomModel, as: 'room', attributes: ['id', 'name']},
                {model: PatientModel, as: 'patient', attributes: ['id', 'name']}
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'malumot chiqdi',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await QueueModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'malumotlar qoshildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await QueueModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.room_id = req.body.room_id;
    model.patient_id = req.body.patient_id;
    model.number = req.body.number;
    model.date_time = req.body.date_time;
    model.status = req.body.status;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =   await QueueModel.destroy({
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
        message: 'ochirildi',
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
module.exports = new QueueController;