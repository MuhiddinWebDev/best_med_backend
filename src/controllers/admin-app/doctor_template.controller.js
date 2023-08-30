
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const Doctor_templateModel = require('../../models/doctor_template.model')
const { validationResult } = require('express-validator');
const DoctorModel = require('../../models/doctor.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class Doctor_templateController {
    getAll = async (req, res, next) => {
        const model = await Doctor_templateModel.findAll({
            include:[
                {model: DoctorModel, as: 'doctor', attributes: ['name']}
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
        const model = await Doctor_templateModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: DoctorModel, as: 'doctor', attributes: ['name']}
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
       const model = await Doctor_templateModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot qoshildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await Doctor_templateModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.complaint = req.body.complaint;
    model.doctor_id = req.body.doctor_id;
    model.name = req.body.name;
    model.medical_history = req.body.medical_history;
    model.objective_vision = req.body.objective_vision;
    model.instrumental = req.body.instrumental;
    model.diagnos = req.body.diagnos;
    model.procedure = req.body.procedure;
    model.recommended = req.body.recommended;
    model.concomitant = req.body.concomitant;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =  await Doctor_templateModel.destroy({
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
        message: 'Malumot ochirildi',
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
module.exports = new Doctor_templateController;