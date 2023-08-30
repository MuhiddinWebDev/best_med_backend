const SettingsModel = require('../../models/settings.model');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const {ValidationError} = require('sequelize');
class SettingsController {
    getAll = async (req, res, next) => {
        let ModelList = await SettingsModel.findAll({
            order: [
                ['name', 'ASC'],
                ['id', 'ASC']
            ],
        });
        res.send({
            "error": false,
            "error_code": 200,
            "message": "Malumotlar chiqdi",
            data: ModelList
        });
    };

    getById = async (req, res, next) => {
        const Settings = await SettingsModel.findOne({
            where:{ id: req.params.id }
        });
        if (Settings === null) {
            throw new HttpException(404, 'not found');
        }
        res.send({
            "error": false,
            "error_code": 200,
            "message": "Malumotlar chiqdi",
            data: Settings
        });
    };

    create = async (req, res, next) => {
        this.checkValidation(req);        
        const model = await SettingsModel.create(req.body);
        
        if (!model) {
            throw new HttpException(500, 'Something went wrong');
        }        
        res.status(201).send(model);
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        let {...data} = req.body;
        let id = parseInt(req.params.id);
        
        let model = await SettingsModel.findOne({where : {id: id}})

        if (!model) {
            throw new HttpException(404, 'data not found');
        } 
        try{
            model.name = data.name;
            model.logo = data.logo;
            model.date1 = Number(data.date1);
            model.date2 = Number(data.date2);
            model.quote = data.quote;
            await model.save();
        }catch(e){
            if(e instanceof ValidationError){
                res.status(404).send(e.errors[0].message);
                return;
            }
            throw new HttpException(500, 'Something went wrong');
        }
        res.send(model);
    };

    delete = async (req, res, next) => {
        const result = await SettingsModel.destroy({where:{ id: req.params.id} });
        if (!result) {
            throw new HttpException(404, 'Not found');
        }
        res.send('Has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

}
module.exports = new SettingsController;