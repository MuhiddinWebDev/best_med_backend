
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const soriModel = require('../../models/sori.model')
const { validationResult } = require('express-validator');
const Register_kassaModel = require('../../models/register_kassa.model');
const register_soriModel = require('../../models/register_sori.model');
const { Op, Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const register_kirish = require('../../models/register_kirish.model');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class soriController {
    getAll = async (req, res, next) => {
        const model = await soriModel.findAll(); 
        res.send(model)
    }

    getOne = async (req, res, next) => {
        const model = await soriModel.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.send(model)
        // client.setex("doctorOne", 3600, JSON.stringify(model))
    }

    byName = async (req, res, next) => {
        this.checkValidation(req);
        const model = await soriModel.findAll({
            attributes: ['category_id']
        })
        res.status(200).send({
            error: false,
            error_code: 201,
            message: "malumot keldi",
            data: model
        })
    }

   create = async (req, res, next) => {
       this.checkValidation(req);
       req.body.status = false;
       const model = await soriModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qoshildi',
        data: model
    });
   }
    
//    kirish = async(req, res, next) => {
//     let body = req.body, date = Math.floor(new Date().getTime() / 1000);
//      let model = await register_kirish.create({
//         "date_time": date,
//         "type": body.type,
//         "price": body.price,
//         "mashina_soni": body.mashina_soni,
//         "odam_soni": body.odam_soni,
//         "doc_type": "Kirim"
//      })
//      let kassa = {
//         "date_time": date,
//         "type": 0,
//         "price": body.price,
//         "pay_type": "Naqt",
//         "doc_type": "Kirim",
//         "doctor_id": model.id,
//         "place": "Kirish",
//         "filial_id": 0
//    }
//    await Register_kassaModel.create(kassa);
//    res.send(model)
//    }

   kassa = async(req, res, next) => {
    let body = req.body, date = Math.floor(new Date().getTime() / 1000), sori,
    filial_id = req.currentUser.filial_id;
    if(body.sori_id){
        sori = await soriModel.findOne({
             where:{
                 id: body.sori_id
             }
          })
       sori.status = true;
       sori.save();
      }
    let register_sori = {
        "date_time": date,
        "type": 0,
        "doc_type": "Kirim",
        "price": sori.price,
        "doc_id": sori.id,
        "status": sori.status
    }
   await register_soriModel.create(register_sori);
    let kassa = {
         "date_time": date,
         "type": 0,
         "price": sori.price,
         "pay_type": "Naqt",
         "doc_type": "Kirim",
         "doctor_id": sori.id,
         "place": "Sori",
         "filial_id": filial_id
    }
    let sorilar = await register_soriModel.findOne({
        attributes:[
            "id","date_time", "price",
            [Sequelize.literal('sori.status'), 'status'],
            [Sequelize.literal('sori.name'), 'sori_name']
        ],
        where:{
            doc_id: sori.id
        },
        include:[
            {model: soriModel, as: 'sori', attributes:[]}
        ]
    })
  await Register_kassaModel.create(kassa);
     res.send({
        error: false,
        error_code: 200,
        message: 'Malumot qoshildi',
        data: sorilar
     })
   }
    
   yechish = async(req, res, next) => {
    let body = req.body;
    let model = await soriModel.findOne({
        where:{
            id: body.sori_id
        }
    })
    model.status = false;
    model.save();
    res.send("so'ri band emas")
   } 

   hisobot = async(req, res, next) => {
    let query = {}, body = req.body, queryx = {};
    query.date_time = {
        [Op.gte]: body.datetime1,
        [Op.lte]: body.datetime2,
    }
    if(body.sori_id != null){
        queryx.id = {[Op.eq]: body.sori_id},
        query.doc_id = {[Op.eq]: body.sori_id}
    }
    const model = await register_soriModel.findAll({
        where: query,
            attributes:[
                'id', 'date_time', 'price','doc_id','doc_type',
                [sequelize.literal('sori.name'), 'sori_name'],
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time <=" + body.datetime1 + " THEN register_sori.price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time >= " + body.datetime1 + " and register_sori.date_time <= " + body.datetime2 + " AND register_sori.doc_type = 'Kirim' THEN register_sori.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time >= " + body.datetime1 + " and register_sori.date_time <= " + body.datetime2 + " AND register_sori.doc_type = 'chiqim' THEN register_sori.price ELSE 0 END)"), 'total_chiqim'],
            ],
            include:[
                {model: soriModel, as: 'sori', attributes: []}
            ],
            group: [
                ['doc_id', 'ASC']
            ]
        
    })
    res.send(model)
   }
   sverka = async(req, res, next) => {
    let query = {}, body = req.body, queryx = {};
    query.date_time = {
        [Op.gte]: body.datetime1,
        [Op.lte]: body.datetime2,
    }
    if(body.sori_id){
        queryx.id = {[Op.eq]: body.sori_id},
        query.doc_id = {[Op.eq]: body.sori_id}
    }
    const model = await register_soriModel.findAll({
            attributes:[
                'id', 'date_time', 'price','doc_id','doc_type',
                [sequelize.literal('sori.name'), 'sori_name'],
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time <=" + body.datetime1 + " THEN register_sori.price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time >= " + body.datetime1 + " and register_sori.date_time <= " + body.datetime2 + " AND register_sori.doc_type = 'Kirim' THEN register_sori.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time >= " + body.datetime1 + " and register_sori.date_time <= " + body.datetime2 + " AND register_sori.doc_type = 'chiqim' THEN register_sori.price ELSE 0 END)"), 'total_chiqim'],
            ],
            include:[
                {model: soriModel, as: 'sori', attributes: []}
            ],
            group:[
                ['id', 'ASC']
            ],
            where: query
    })
    res.send(model)
   }
   
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await soriModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.price = req.body.price;
    model.status = false;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =   await soriModel.destroy({
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
module.exports = new soriController;