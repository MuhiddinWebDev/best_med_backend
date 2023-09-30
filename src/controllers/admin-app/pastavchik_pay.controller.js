
const HttpException = require('../../utils/HttpException.utils');
const pastavchik_payModel = require('../../models/pastavchik_pay.model')
const { validationResult } = require('express-validator');
const register_supplierModel = require('../../models/register_supplier.model')
const register_kassaModel = require('../../models/register_kassa.model')
const { Op } = require('sequelize');
const { sequelize } = require('../../models/register_supplier.model');
const pastavchikModel = require('../../models/pastavchik.model');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class pastavchik_payController {
    getAll = async (req, res, next) => {
        const model = await pastavchik_payModel.findAll({
            include:[
                {model: pastavchikModel, as: 'pastavchik'}
            ],
            order: [
                ['id', 'DESC'] 
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
        let model = await pastavchik_payModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: pastavchikModel, as: 'pastavchik'}
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        if(model.dataValues.type == false){
            model.dataValues.type = 0;
            model.dataValues.date_time = String(model.dataValues.date_time)
        }
        else{
            model.dataValues.type = 1;
            model.dataValues.date_time = String(model.dataValues.date_time)
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
       let filial_id = req.currentUser.filial_id;
      
       const model = await pastavchik_payModel.create({
          "type": req.body.type,
          "price": req.body.price,
          "backlog": req.body.backlog,
          "jami_summa": req.body.jami_summa,
          "pastavchik_id": req.body.pastavchik_id,
          "filial_id": filial_id,
          "comment": req.body.comment,
          "date_time": Math.floor(new Date().getTime() / 1000)
       });
      
       let register = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "doc_id": model.id,
        "summa": model.price,
        "doc_type": "kirim",
        "type": model.type,
        "comment": model.comment,
        "place": "Паставшик",
        "pastavchik_id": model.pastavchik_id,
        "filial_id": filial_id
      }

      await register_supplierModel.create(register);
      
      let kassa = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "doctor_id": model.id,
        "price": model.price,
        "doc_type": "Chiqim",
        "pay_type": model.type == 0 ? "Naqt" : "Plastik",
        "type": model.type,
        "place": "Паставшик",
        "filial_id": filial_id,
        "comment": model.comment,
        "user_id": req.currentUser.id
      }
       
      await register_kassaModel.create(kassa)
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
       });
    }

    update = async (req, res, next) => {
        this.checkValidation(req);
        let filial_id = req.currentUser.filial_id;
        
        const model = await pastavchik_payModel.findOne({
            where:{
                id: req.params.id
            }
        });
        
        model.type = req.body.type;
        model.price = req.body.price;
        model.backlog = req.body.backlog;
        model.comment = req.body.comment;
        model.jami_summa = req.body.jami_summa;
        model.pastavchik_id = req.body.pastavchik_id;
        model.filial_id = filial_id;
        model.date_time = Math.floor(new Date().getTime() / 1000);
        await model.save();
        
        await register_supplierModel.destroy({
            where:{
                doc_id: model.id,
                place: 'Паставшик'
            },
            force: true
        })
        
        await register_kassaModel.destroy({
            where:{
                doctor_id: model.id,
                place: 'Паставшик'
            },
            force: true
        })

        let register = {
            "date_time": Math.floor(new Date().getTime() / 1000),
            "doc_id": model.id,
            "summa": model.price,
            "doc_type": "kirim",
            "type": model.type,
            "place": "Паставшик",
            "pastavchik_id": model.pastavchik_id,
            "filial_id": filial_id,
            "comment": model.comment,
        }

        await register_supplierModel.create(register);
        
        let kassa = {
            "date_time": Math.floor(new Date().getTime() / 1000),
            "doctor_id": model.id,
            "price": model.price,
            "doc_type": "Chiqim",
            "pay_type": model.type == 0 ? "Naqt" : "Plastik",
            "type": model.type,
            "place": "Паставшик",
            "filial_id": filial_id,
            "user_id": req.currentUser.id,
            "comment": model.comment,
        }

        await register_kassaModel.create(kassa)
        
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }

    pastavchikHisobot = async(req, res, next) => {
    let body = req.body; 
    let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.pastavchik_id !== null){
            query.id = {[Op.eq] : body.pastavchik_id }  
            queryx.pastavchik_id = {[Op.eq]: body.pastavchik_id}
            queryx.filial_id = {[Op.eq]: body.filial_id}
        }
        else{
            queryx.filial_id = {[Op.eq]: body.filial_id}
        }
    let model = await register_supplierModel.findAll({
        attributes : [ 
            'id', 'doc_id', "type", "date_time", "doc_type", "summa", "pastavchik_id", "place", "comment",
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
        include:[
            {model: pastavchikModel, as: 'pastavchik'}
        ],
        where: queryx,
        group: ['pastavchik_id']
    })
    res.send(model)
    }

    getPastavchik = async(req, res, next) => {
    let prixod = await register_supplierModel.findAll({
        where:{
            pastavchik_id: req.body.pastavchik_id,
            place: 'Приход'
        },
        raw: true
    })

    let pastavchik = await register_supplierModel.findAll({
            where:{
                pastavchik_id: req.body.pastavchik_id,
                place: 'Паставшик'
            },
            raw: true
    })

    let umumiy, sum1, sum2;
    
    function prixodSumma(prixod){
        sum1 = 0;
        for(let key of prixod){
            sum1 += key.summa;
        }
        return sum1;
    }
    
    prixodSumma(prixod);
    
    function pastavchikSumma(pastavchik){
         sum2 = 0;
         for(let key of pastavchik){
            sum2 += key.summa;
         }
         return sum2;
    }

    pastavchikSumma(pastavchik);
    umumiy = sum2 - sum1;
    res.send({
        "backlog": umumiy
    })
    }
    
    pastavchikSverka = async(req, res, next) => {
    let body = req.body; 
    let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.pastavchik_id !== null){
            query.id = {[Op.eq] : body.pastavchik_id }  
            queryx.pastavchik_id = {[Op.eq]: body.pastavchik_id}
            queryx.filial_id = {[Op.eq]: body.filial_id}
        }
        else{
            queryx.filial_id = {[Op.eq]: body.filial_id}
        }
    let model = await register_supplierModel.findAll({
        attributes : [ 
            'id', 'pastavchik_id', "type", "date_time", "doc_type", "summa", "doc_id", "place", "comment",
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
        where: queryx,
        group: ['id']
    })
    res.send(model)
    } 

    delete = async (req, res, next) => {
        try {
            const model = await pastavchik_payModel.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (!model) {
                throw new HttpException(404, "bunday id yoq")
            }
    
            await register_supplierModel.destroy({
                where: {
                    doc_id: model.id,
                    place: 'Паставшик'
                },
                force: true
            })
    
            await register_kassaModel.destroy({
                where: {
                    doctor_id: model.id,
                    place: 'Паставшик'
                },
                force: true
            })
    
            await pastavchik_payModel.destroy({
                where: {
                    id: model.id
                }
            });
    
            res.status(200).send({
                error: false,
                error_code: 200,
                message: 'Malumot o\'chirildi',
                data: model
            });
        } catch (error) {
            console.error(error); 
        }
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
module.exports = new pastavchik_payController;