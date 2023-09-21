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
    
        const lastElement = ModelList[ModelList.length - 1]; // Get the last element
    
        res.send({
            "error": false,
            "error_code": 200,
            "message": "Malumotlar chiqdi",
            data: lastElement // Send only the last element
        });
    };

    getById = async (req, res, next) => {
        const settings = await SettingsModel.findAll();

        if (settings.length === 0) {
          throw new HttpException(404, 'not found');
        }
      
        const lastSetting = settings[settings.length - 1];

        res.send({
            "error": false,
            "error_code": 200,
            "message": "Malumotlar chiqdi",
            data: lastSetting
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
        try {
            // Validate input
            this.checkValidation(req);

            // Extract data from request body
            const { name, logo, date1, date2, quote, header_right, header_left } = req.body;

            // Find the model
            const models = await SettingsModel.findAll();
            console.log(models)
            
            if (models.length == 0) {
                throw new HttpException(404, 'Not found');
            }
          
            const modelToUpdate = models[models.length - 1];

            // Update model properties
            modelToUpdate.name = name;
            modelToUpdate.logo = logo;
            modelToUpdate.date1 = Number(date1);
            modelToUpdate.date2 = Number(date2);
            modelToUpdate.quote = quote;
            modelToUpdate.header_right = header_right;
            modelToUpdate.header_left = header_left;

            // Save the updated model
            await modelToUpdate.save();

            res.send(modelToUpdate);
        } catch (e) {
            if (e instanceof ValidationError) {
                res.status(400).send(e.errors[0].message);
            } else {
                console.error(e);
                res.status(500).send('Something went wrong');
            }
        }
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