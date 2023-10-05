
const HttpException = require('../../utils/HttpException.utils');
const PayDirectModel = require('../../models/pay_direct.model')
const RegisterKassaModel = require('../../models/register_kassa.model')
const UserModel = require('../../models/user.model')
const DirectModel = require('../../models/direct.model')
const FilialModel = require('../../models/filial.model')
const RegisterDirectModel = require('../../models/register_direct.model')
const {Op} = require('sequelize');
const sequelize = require('../../db/db-sequelize')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class reagentController {
    getAll = async (req, res, next) => {
        const model = await PayDirectModel.findAll({
            include: [
                {
                    model: DirectModel,
                    as: 'direct'
                },
                {
                    model: UserModel,
                    as: 'user'
                },
                {
                    model: FilialModel,
                    as: 'filial'
                }
            ],
            order: [
                ['id', 'desc']
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
        const model = await PayDirectModel.findOne({
            where:{
                id: req.params.id
            },
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
        let {datetime, direct_id, sum, pay_type, user_id, backlog, filial_id, comment} = req.body

        user_id = req.currentUser.id

        let data = {
            datetime,
            direct_id,
            sum,
            pay_type,
            user_id,
            filial_id,
            backlog,
            comment
        } 

       const model = await PayDirectModel.create(data);
       
        let register = {
            date_time: model.datetime,
            doctor_id: model.id,
            type: model.pay_type,
            price: model.sum,
            place: "Вакилга тўлов",
            filial_id: model.filial_id,
            user_id: model.user_id,
            pay_type: model.pay_type == 1 ? "Plastik" : "Naqt",
            doc_type: "chiqim"
        }

        let rDirect = {
            date_time: datetime,
            type: model.pay_type,
            price: model.sum,
            doc_id: model.id,
            doc_type: "chiqim",
            place: "Вакилга тўлов",
            comment,
            direct_id,
            filial_id
        }

       const kassaModel = await RegisterKassaModel.create(register)
       const registerDirectModel = await RegisterDirectModel.create(rDirect) 


       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model,
        data2: kassaModel
    });
    }
   
    update = async (req, res, next) => {
        let {datetime, direct_id, sum, pay_type, user_id, backlog, filial_id, comment} = req.body
        
        const model = await PayDirectModel.findOne({
            where:{
                id: req.params.id
            }
        });
    
        model.datetime = datetime
        model.direct_id = direct_id
        model.sum = sum
        model.pay_type = pay_type
        model.backlog = backlog
        model.filial_id = filial_id
        model.user_id = req.currentUser.id
        model.comment = comment
        await model.save();
    
        let oldRegisterKassa = await RegisterKassaModel.destroy({
            where:{
                doctor_id: model.id,
                place: "Вакилга тўлов"
            }
        });

        let oldRegisterDirect = await RegisterDirectModel.destroy({
            where:{
                doc_id: model.id,
                place: "Вакилга тўлов"
            }
        });

        let register = {
            date_time: model.datetime,
            doctor_id: model.id,
            type: model.pay_type,
            price: model.sum,
            place: "Вакилга тўлов",
            filial_id: model.filial_id,
            user_id: model.user_id,
            pay_type: model.pay_type == 1 ? "Plastik" : "Naqt",
            doc_type: "chiqim"
        }

        let rDirect = {
            date_time: datetime,
            type: model.pay_type,
            price: model.sum,
            doc_id: model.id,
            doc_type: "chiqim",
            place: "Вакилга тўлов",
            comment,
            direct_id,
            filial_id
        }

        const kassaModel = await RegisterKassaModel.create(register)
        const registerDirectModel = await registerDirectModel.create(rDirect) 


        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    
    delete = async (req, res, next) => {
        const model = await PayDirectModel.findOne({
            where:{
                id: req.params.id
            }
        });
    
        if(!model){
            throw new HttpException(404, "bunday id yoq")
        }
    
        let oldRegisterKassa = await RegisterKassaModel.destroy({
            where:{
                doctor_id: model.id,
                place: "Вакилга тўлов"
            }
        });

        let oldRegisterDirect = await RegisterDirectModel.destroy({
            where:{
                doc_id: model.id,
                place: "Вакилга тўлов"
            }
        });

        let oldModel = await PayDirectModel.destroy({
            where:{
                id: model.id,
            }
        })

        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot o\'chirildi',
            data: model
        });
    }

    // Vakildan qarzdorlik
    getDirect = async (req, res) => {
        let {direct_id} = req.body

        const kirim = await RegisterDirectModel.findAll({
            where: {
              direct_id, 
              doc_type: 'kirim'
            },
            attributes: [
              [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('price')), 0), 'totalAmount'] 
            ]
        });
          
        const chiqim = await RegisterDirectModel.findAll({
            where: {
              direct_id,
              doc_type: 'chiqim' 
            },
            attributes: [
              [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('price')), 0), 'totalAmount']
            ]  
        })
        
        const Kirims = kirim[0].get('totalAmount');
        const Chiqims = chiqim[0].get('totalAmount');
                  
        let result = (Kirims - Chiqims) * (-1)

        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Hisobot',
            data: result,
        });
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new reagentController;