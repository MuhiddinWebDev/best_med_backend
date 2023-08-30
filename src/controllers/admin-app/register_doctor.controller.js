const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const Register_DoctorModel = require('../../models/register_doctor.model');
const DoctorModel = require('../../models/doctor.model');
const register_doctorModel = require('../../models/register_doctor.model');
const { Op } = require("sequelize");
const sequelize = require('sequelize');
const Register_inspectionModel = require('../../models/register_inspection.model');
const inspectionCategory = require('../../models/inspector_category.model');
const RegistrationModel = require('../../models/registration.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegisterDoctorController {
    TekshiruvSoni = async(req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.inspection_category !== null){
            query.id = {[Op.eq] : body.inspection_category }  
            queryx.inspection_category = {[Op.eq]: body.inspection_category}
        };
        const model = await Register_inspectionModel.findAll({
            attributes:[
                [sequelize.fn("COUNT", sequelize.col("registration.patient_id")), "count"]
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name'], where: query},
                { model: RegistrationModel, as: 'registration', attributes: ['patient_id']}
            ],
            where: {
                inspection_category: {[Op.eq]: body.inspection_category},
                date_time: {
                    [Op.gte]: datetime1,
                    [Op.lte]: datetime2
                }
            }
        })
        res.send(model)
    }
   
   DoctorCount = async (req, res, next) => {
    this.checkValidation(req);
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.doctor_id !== null){
        query.id = {[Op.eq] : body.doctor_id }
        queryx.doctor_id = {[Op.eq]: body.doctor_id}
    };
    const model = await Register_DoctorModel.findAll({
        attributes: [ 'doc_type', 'id', 'date_time', "doc_id", "comment","doctor_id", "place",
           [sequelize.literal("COUNT(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + ` AND register_doctor.doctor_id = ${body.doctor_id} THEN register_doctor.doctor_id ELSE 0 END)`), 'count'],
       ],  
       where: queryx,
       group: ['doctor_id']
    })
    res.send(model)
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
module.exports = new RegisterDoctorController;