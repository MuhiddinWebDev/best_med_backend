const UserModel = require('../../models/user.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret_jwt} = require('../../startup/config');
const DoctorModel = require('../../models/doctor.model');
const InspectionModel = require('../../models/inspector_category.model');
const { error } = require('winston');
const RoomModel = require('../../models/room.model');
const filialModel = require('../../models/filial.model');
const settingsModel = require('../../models/settings.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        const {  password, login, filial_id } = req.body;
        
        const model = await UserModel.findOne({
            include:[
                {model: DoctorModel, as: 'doctor',
            
            attributes: ['id', 'name']
        },
        {
            model: InspectionModel, as: 'inspecton',
            attributes: ['id', 'name']
        },
        {
            model: filialModel, as: 'filial'
        }
            ],
            where:{
                user_name: login,
                filial_id: filial_id
            }
        });

        if(!model){
            throw new HttpException(404, 'Filialda bunday hodim mavjud emas')
        }
        
        const isMatch = await bcrypt.compare(password, model.password)
        delete model.dataValues['password'];

        if(!isMatch){
            throw new HttpException(404, "Parol noto'g'ri kiritildi")
        }

        const token = jwt.sign({ user_id: model.id.toString() }, secret_jwt);
        if(!token){
           throw new HttpException(404, "token mavjud emas")
        }
        

        const checkExpiredApp = await settingsModel.findAll({
            order: [['id', 'DESC']],
            limit: 1
        })

        let currentDay = new Date().toISOString().split("T")[0]
        let appDate = new Date(checkExpiredApp[0].date2 * 1000).toISOString().split("T")[0]
        
        let expired = false
        if(currentDay > appDate) {
            expired = true
        }

        model.token = token
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Ro\'yhatdan o\'tdingiz',
            data: model,
            expired: expired
        });
    };

    byName = async (req, res, next) => {
        const model = await UserModel.findAll({
                    attributes: ['id','user_name'],
        })
        res.status(200).send({
            error: false,
            error_code: 20,
            message: 'Malumot keldi', 
            data: model
        });
    }
    
    FilialUserlari = async (req, res, next) => {
        const model = await UserModel.scope('withoutPassword').findAll({
                    attributes: ['id','user_name','role'],
                    where:{
                        filial_id: req.body.filial_id
                    }
        })
        res.status(200).send({
            error: false,
            error_code: 20,
            message: 'Malumot keldi', 
            data: model
        });
    }

    filialUserKasser = async(req,res,next) => {
        let body = req.body;
        const model = await UserModel.findAll({
            where:{
                filial_id: body.filial_id,
                role: 'Kasser'
            }
        })
        res.status(200).send({
            error: false,
            error_code: 20,
            message: 'Malumot keldi', 
            data: model
        });
    }

    getAll = async (req, res, next) =>{
        const model = await UserModel.scope('withoutPassword').findAll({
            include:[
                {model: DoctorModel, as: 'doctor',
            attributes: ['id', 'name']
        },
        {
            model: InspectionModel, as: 'inspecton',
            attributes: ['id', 'name']
        },
        {
            model: RoomModel, as: 'Room',
            attributes: ['id', 'name']
        },
        {
            model: filialModel, as: 'filial'
        }
            ],
        }); 
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) =>{
        const model = await UserModel.scope('withoutPassword').findOne({
            where:{
                id: req.params.id
            }
        })
        if(!model){
            throw new HttpException(404, "bu id da malumot yo\'q")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }

    create = async(req, res, next) => {
        this.checkValidation(req);
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
        const modell = await UserModel.create(req.body);
        delete req.body['password']
        res.status(200).send({
            error: false,  
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: modell
        });
    }

    update = async (req, res, next) =>{
        const salt = await bcrypt.genSalt();
        let data = req.body;
            const pasXash = await bcrypt.hash(data.password.toString(), salt);
            data['password_hash'] = pasXash;
            const model = await UserModel.scope('withoutPassword').findOne({
                where:{
                    id: req.params.id
                }
            })
        model.user_name = req.body.user_name;
        model.room_id = req.body.room_id;
        model.doctor_id = req.body.doctor_id;
        model.role = req.body.role;
        model.inspection_category_id = req.body.inspection_category_id;
        model.pay_type = req.body.pay_type;
        model.salary = req.body.salary;
        model.percent = req.body.percent;
        model.filial_id = req.body.filial_id;
        model.password = data.password_hash;
        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }

    delete = async (req, res, next) =>{
        const model = await UserModel.destroy({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, "bunday id yoq")
        }
        else{
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot ochirildi',
            data: model
        });
    }
    }

    checkValidation = (req) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }    
}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;