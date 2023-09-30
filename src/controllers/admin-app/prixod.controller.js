
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const prixod_Model = require('../../models/prixod.model')
const { validationResult } = require('express-validator');
const prixod_tableModel = require('../../models/prixod_table.model');
const reagentModel = require('../../models/reagent.model');
const register_supplierModel = require("../../models/register_supplier.model");
const register_reagentModel = require('../../models/register_reagent.model');
const pastavchikModel = require('../../models/pastavchik.model');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class prixodController {
    getAll = async (req, res, next) => {
        const model = await prixod_Model.findAll({
            include:[
                {model: prixod_tableModel, as: 'prixod_table',
            include:[
                {model: reagentModel, as: 'reagent'}
            ]
            },
            {model: pastavchikModel, as: 'pastavchik'}
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
        const model = await prixod_Model.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: prixod_tableModel, as: 'prixod_table',
            include:[
                {model: reagentModel, as: 'reagent'}
            ]
            },
            {model: pastavchikModel, as: 'pastavchik'}
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        model.dataValues.date_time = String(model.dataValues.date_time);
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }

    create =  async(req, res, next) => {
       this.checkValidation(req);

       const {prixod_table, ...data} = req.body;
       const model = await prixod_Model.create({
            "date_time": Math.floor(new Date().getTime() / 1000),
            "pastavchik_id": req.body.pastavchik_id,
            "umumiy_summa": req.body.umumiy_summa,
            "comment": req.body.comment
       });

       this.#prixod_table(model, prixod_table);
       
       var register = {
         "date_time": Math.floor(new Date().getTime() / 1000),
         "doc_id": model.id,
         "summa": model.umumiy_summa,
         "doc_type": "chiqim",
         "type": 2,
         "place": "Prixod",
         "pastavchik_id": model.pastavchik_id,
         "filial_id": req.body.filial_id
       }
       
       await register_supplierModel.create(register);
       
       res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: model
       });
    }

    update = async (req, res, next) => {
        this.checkValidation(req);
        const model = await prixod_Model.findOne({
            where:{
                id: req.params.id
            }
        });

        const {prixod_table, ...data} = req.body;
        model.date_time = req.body.date_time;
        model.pastavchik_id = req.body.pastavchik_id;
        model.umumiy_summa = req.body.umumiy_summa;
        model.comment = req.body.comment;
        model.save();
        
        this.#prixod_table(model, prixod_table, false);
        await this.#deleteRegister_supplier(model.id)
        
        var register = {
            "date_time": Math.floor(new Date().getTime() / 1000),
            "doc_id": model.id,
            "summa": model.umumiy_summa,
            "doc_type": "chiqim",
            "type": 2,
            "place": "Приход",
            "pastavchik_id": model.pastavchik_id
        }
        
        await register_supplierModel.create(register);
        
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }

    #prixod_table = async(model, prixod_table, insert = true) => {
        if(!insert){
            await this.#deletePrixodTable(model.id)
            await this.#deleteRegister_reagent(model.id)
        }
        for(let key of prixod_table){
            var tables = {
                "reagent_id": key.reagent_id,
                "price": key.price,
                "prixod_id": model.id,
                "count": key.count,
                "summa": key.summa
            }
            await prixod_tableModel.create(tables);
            var reagent = {
                "reagent_id": key.reagent_id,
                "price": key.price,
                "doc_id": model.id,
                "count": key.count,
                "summa": key.summa,
                "date_time": Math.floor(new Date().getTime() / 1000),
                "doc_type": "chiqim"
            }
            await register_reagentModel.create(reagent);
        }
    }

    delete = async (req, res, next) => {
        const model = await prixod_Model.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if (!model) {
            throw new HttpException(404, "Bunday id mavjud emas");
        }
        
        await prixod_Model.destroy({
            where: {
                id: req.params.id
            }
        });
    
        await this.#deletePrixodTable(model.id)
        await this.#deleteRegister_reagent(model.id)
        await this.#deleteRegister_supplier(model.id)

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

    #deletePrixodTable = async (doc_id) =>{
        await prixod_tableModel.destroy({where:{prixod_id: doc_id},force: true })
    }
    
    #deleteRegister_reagent = async (id) => {
            await register_reagentModel.destroy({where: {doc_id: id},force: true })
    }

    #deleteRegister_supplier = async (id) => {
        await register_supplierModel.destroy({where: {doc_id: id, place: 'Prixod'},force: true })
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
module.exports = new prixodController;