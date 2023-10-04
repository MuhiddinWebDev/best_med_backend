const ModelModel = require('../../models/registration.model');
const arxiv = require('../../models/registration_arxiv.model')
const HttpException = require('../../utils/HttpException.utils');
const Register_kassaModel = require('../../models/register_kassa.model')
const inspectionCategory = require('../../models/inspector_category.model')
const { sequelize } = require('../../models/user.model');
const { validationResult } = require('express-validator');
const registration_palataModel = require('../../models/registration_palata.model');
const Registration_inspectionModel = require('../../models/registration_inspection.model');
const Registration_inspection_childModel = require('../../models/registration_inspection_child.model');
const Registration_doctorModel = require('../../models/registration_doctor.model');
const Registration_recipeModel = require('../../models/registration_recipe.model');
const Registration_filesModel = require('../../models/registration_files.model');
const Register_mkb = require('../../models/register_mkb.model');
const register_palataModel = require('../../models/register_palata.model');
const Register_inspectionModel = require('../../models/register_inspection.model');
const RegisterDoctorModel = require('../../models/register_doctor.model');
const UserModel = require('../../models/user.model');
const PatientModel = require('../../models/patient.model');
const QueueModel = require('../../models/queue.model');
const RoomModel = require('../../models/room.model');
const DoctorModel = require('../../models/doctor.model');
const DoctorCategory = require('../../models/doctor_category.model')
const InspectionModel = require('../../models/inspection.model')
const { Op } = require("sequelize");
const directModel = require('../../models/direct.model')
const registerDirectModel = require('../../models/register_direct.model')
const registerMedDirectModel = require('../../models/register_med_direct.model')
const palataModel = require('../../models/palata.model')
const PillModel = require('../../models/pill.model');
const Registration_payModel = require('../../models/registration_pay.model');
const registration_palata_arxivModel = require('../../models/registration_palata_arxiv.model')
const Registration_inspection_arxivModel = require('../../models/registration_inspection_arxiv.model');
const Registration_inspection_child_arxxivModel = require('../../models/registration_inspection_child_arxiv.model');
const Registration_pay_arxivModel = require('../../models/registration_pay_arxiv.model');
const Registration_doctor_arxivModel = require('../../models/registration_doctor_arxiv.model');
const Registration_recipe_arxivModel = require('../../models/registration_recipe_arxiv.model');
const Registration_files_arxivModel = require('../../models/registration_files_arxiv.model');
const RegistrationModel = require('../../models/registration.model');
const uplataModel = require('../../models/uplata.model')
const moment = require('moment');
const register_mkb = require('../../models/register_mkb.model');
const db = require('../../db/db-sequelize');
const Registration_arxivModel = require('../../models/registration_arxiv.model');
const register_doctor_arxivModel = require('../../models/register_doctor_arxiv.model');
const register_inspection_arxivModel = require('../../models/register_inspection_arxiv.model');
const register_kassa_arxivModel = require('../../models/register_kassa_arxiv.model');
const register_mkb_arxivModel = require('../../models/register_mkb_arxiv.model');
const RegionModel = require('../../models/region.model');
const districtModel = require('../../models/district.model');
const filialModel = require('../../models/filial.model');

class RegistrationController {
    q=[];
    ArxivgaOlish = async (req, res, next) => {
    try{
     let qarz  =  await ModelModel.findAll({
        where:{
            id: req.params.id,
            backlog: 0, 
            status: 'complete'
        }
     });
    if(qarz.length > 0){
        let sum =  qarz.some(item => item.backlog <= 0);
        if(sum){
            await db.query(`INSERT INTO registration_inspection_child_arxiv SELECT * FROM registration_inspection_child where registration_id = ${req.params.id}`);
            await db.query(`INSERT INTO registration_inspection_arxiv SELECT * FROM registration_inspection where registration_id = ${req.params.id}`);        
            await db.query(`INSERT INTO registration_files_arxiv SELECT * FROM registration_files where registration_id = ${req.params.id}`);
            await db.query(`INSERT INTO registration_recipe_arxiv SELECT * FROM registration_recipe where registration_id = ${req.params.id}`);
            await db.query(`INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor where registration_id = ${req.params.id}`);
            await db.query(`INSERT INTO registration_arxiv SELECT * FROM registration where backlog = 0 and status = 'complete' and id = ${req.params.id}`);
            await db.query(`INSERT INTO registration_pay_arxiv SELECT * FROM registration_pay where registration_id = ${req.params.id}`);
            await db.query(`INSERT INTO registration_palata_arxiv SELECT * FROM registration_palata where registration_id = ${req.params.id}`);
            await db.query(`DELETE from registration where backlog = 0 and status = 'complete' and id = ${req.params.id}`);
            await db.query(`DELETE from registration_recipe where registration_id = ${req.params.id}`);
            await db.query(`DELETE from registration_doctor where registration_id = ${req.params.id}`);
            await db.query(`DELETE from registration_inspection_child where registration_id = ${req.params.id}`);
            await db.query(`DELETE from registration_files where registration_id = ${req.params.id}`);
            await db.query(`DELETE from registration_inspection where registration_id = ${req.params.id}`);
            await db.query(`DELETE from registration_pay where registration_id = ${req.params.id}`);
            await db.query(`DELETE from registration_palata where registration_id = ${req.params.id}`);
        }
        res.send({
            error: false,
            error_code: 201,
            message: "Malumot arhivga olindi"
        })
    }else{
        // console.log("pul tolamagan");
        // throw new HttpException(401, "pul tolanmagan")
    }
    }
    catch(err){
       console.log(err);
    }
    };
    statsionar = async(req, res, next) => {
    let query = {}
    query.type_service = "Statsionar"
    if(req.currentUser.role != 'Admin') {
        query.filial_id = req.currentUser.filial_id
    }
    try{
        let model = await ModelModel.findAll({
            where: query,
            include:[ 
                {model: filialModel, as: 'filial'},
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: PatientModel, as: 'patient',
                    include:[
                        {model: RegionModel, as: 'region'},
                        {model: districtModel, as: 'district'}
                    ],
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        },
                        {model: register_mkb, as: 'register_mkb'}
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include:[
                        {
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                } 
            ],
             order: [
                ['created_at', 'desc']
            ]
        })
      if(!model)  {
        throw new HttpException(401, "malumot topilmadi")
      }
      res.send({
        error: false,
        error_code: 201,
        message: 'malumot topildi',
        data: model
      })  
    }
    catch(err){
        console.log(err);
    }
    } 
    getAll = async (req, res, next) => {
        let query = {}

        if(req.currentUser.role != 'Admin') {
            query.filial_id = req.currentUser.filial_id
        }

        const model = await ModelModel.findAll({
            where: query,
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: PatientModel, as: 'patient',
                    include:[
                        {model: RegionModel, as: 'region'},
                        {model: districtModel, as: 'district'}
                    ],
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        },
                        {model: register_mkb, as: 'register_mkb'}
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include:[
                        {
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                },
                {model: filialModel, as: 'filial'}
             ],
             order: [
                ['created_at', 'desc']
             ]
        });

        res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }  
    getByBemor = async (req, res, next) => {
        let { patient_id } = req.body;
        let query = {};
        if(patient_id){
            query.patient_id = patient_id;
        }
        const model = await ModelModel.findOne({
            where:query
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
        const Prixod = await ModelModel.findOne({
            where:{ id: req.params.id },
            include: [
                {
                  model: UserModel, as: 'user', attributes:['user_name']
                }, 
                {
                  model: registration_palataModel, as: 'registration_palata',
                  include:[
                    {model: palataModel, as: 'palatas', attributes: ['name']}
                  ]
                }, 
                { model: Registration_doctorModel,as: 'registration_doctor', 
                    include : [
                        { model: Registration_recipeModel, as: 'registration_recipe',
                            include:[
                                {model:PillModel,as:'pill'}
                            ]
                        },
                        { model: DoctorModel, as: 'doctor',
                            include:[
                                {model:DoctorCategory,as:'doctor_category',attributes:['name']},
                            ]
                        },
                        {model: register_mkb, as: 'register_mkb'},
                        {model: filialModel, as: 'filial'}
                    ]
                },
                { model: Registration_inspectionModel,as: 'registration_inspection', 
                    include : [
                        { model: Registration_inspection_childModel, as: 'registration_inspection_child'},
                        { model: InspectionModel, as: 'inspection',
                            include:[
                                {model:UserModel,as:'User',attributes:['user_name']},
                                {model: inspectionCategory, as: 'inspector_category'}
                            ]
                        },
                        {model: filialModel, as: 'filial'}
                        ]
                },
                { model: Registration_filesModel,as: 'registration_files'},
                { model: PatientModel,as: 'patient', 
                include:[
                    {model: RegionModel, as: 'region'},
                    {model: districtModel, as: 'district'}
                ],
            },
                {model: Registration_payModel, as: 'registration_pay',
                  include:[
                    {model: filialModel, as: 'filial'},
                    {model: UserModel, as: 'user', attributes: ['user_name']}
                  ]
                }
            ]
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        
       res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: Prixod
        });
    }
    getOneArxiv = async (req, res, next) => {
        this.checkValidation(req);
        const Prixod = await arxiv.findOne({
            where:{ id: req.params.id },
            include: [
                {
                  model: UserModel, as: 'user', attributes:['user_name']
                }, 
                {
                  model: registration_palata_arxivModel, as: 'registration_palata',
                  include:[
                    {model: palataModel, as: 'palatas', attributes: ['name']}
                  ]
                },  
                { model: Registration_doctor_arxivModel,as: 'registration_doctor', 
                    include : [
                        { model: Registration_recipe_arxivModel, as: 'registration_recipe',
                        include:[
                            {model:PillModel,as:'pill'}]
                    },
                        { model: DoctorModel, as: 'doctor',
                    include:[
                        {model:DoctorCategory,as:'doctor_category',attributes:['name']},
                    ]}
                    ]
                },
                { model: Registration_inspection_arxivModel,as: 'registration_inspection', 
                    include : [
                        { model: Registration_inspection_child_arxxivModel, as: 'registration_inspection_child'},
                        { model: InspectionModel, as: 'inspection',
                        include:[
                            {model:UserModel,as:'User',attributes:['user_name']}
                        ]
                    }
                    ]
                },
                { model: Registration_files_arxivModel,as: 'registration_files'},
                { model: PatientModel,as: 'patient',
                include:[
                    {model: RegionModel, as: 'region'},
                    {model: districtModel, as: 'district'}
                ]
                 },
                {model: Registration_pay_arxivModel, as: 'registration_pay',
                include:[
                    {model: filialModel, as: 'filial'},
                    {model: UserModel, as: 'user', attributes: ['user_name']}
                  ]
                }
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
       res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: Prixod
        });
    }
    delQueue = async (req, res, next) => {
        let time=Math.floor(new Date().getTime() / 1000)-20000;
        await QueueModel.destroy({where:{datetime:{[Op.lte]:time}}});
        res.send('deleted');
    };
    getPechat = async (req, res, next) => {
        this.checkValidation(req);
        const Prixod = await QueueModel.findAll({
            where:{ patient_id: req.params.patient,status:"waiting" },
            include: [
                { model: RoomModel,as: 'room',
                include: [
                    { model: UserModel,as: 'users'}
                ],
            },
                { model: PatientModel,as: 'patient'},
                {model: RegistrationModel, as: 'registration', 
              include:[
                {model: Registration_doctorModel, as: 'registration_doctor', attributes: ['price']},
                {model: Registration_inspectionModel, as: 'registration_inspection', attributes: ['price']},
              ]
            },
            ],
            order: [
                ['number', 'ASC']
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        // for(var element of Prixod){
        //     element.status='printed';
        //     await element.save();
        // }
        res.send(Prixod);
    };
    getByPatient = async (req, res, next) => {
        const Prixod = await ModelModel.findAll({
            where:{ patient_id: req.params.patient },
            include: [
                { model: PatientModel,as: 'patient',
                include:[
                    {model: RegionModel, as: 'region'},
                    {model: districtModel, as: 'district'}
                ],
                 },
                { model: Registration_doctorModel,as: 'doctor', 
                    include : [
                        { model: Registration_recipeModel, as: 'recipe'}
                    ]
                },
                { model: Registration_inspectionModel,as: 'inspection', 
                    include : [
                        { model: Registration_inspection_childModel, as: 'child'}
                    ]
                },
                { model: Registration_filesModel,as: 'files'},
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        res.send(Prixod);
    };
    create = async (req, res, next) => {
        this.checkValidation(req);
        let filial_id = req.currentUser.filial_id;
        var {registration_inspection,registration_doctor,registration_files,registration_palata, registration_pay, ...data} = req.body;
        data.created_at=Math.floor(new Date().getTime() / 1000);
        const model = await ModelModel.create(data);
        await this.#directAdd(model);
        if (!model) {
            throw new HttpException(500, 'Something went wrong');
        }
        await this.#inspectionadd(model, registration_inspection);
        await this.#doctoradd(model,  registration_doctor);
        await this.#filesadd(model, registration_files);
        await this.#palataadd(model, registration_palata, filial_id);
        await this.#payAdd(model, registration_pay);
        await this.#queue();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });

    };
    update = async (req, res, next) => {
        this.checkValidation(req);
        let filial_id = req.currentUser.filial_id;
        var {registration_inspection,registration_doctor,registration_files,registration_palata,registration_pay, ...data} = req.body;
        var id = parseInt(req.params.id);
        var model = await ModelModel.findOne({where : {id: id}})
        if (!model) {
            throw new HttpException(404, 'data not found');
        } 
        try{
            model.updated_at=Math.floor(new Date().getTime() / 1000);
            model.user_id = data.user_id;
            model.direct_id = data.direct_id;
            model.status = data.status;
            model.patient_id = data.patient_id;
            model.type_service = data.type_service;
            model.complaint = data.complaint;
            model.summa = data.summa;
            model.pay_summa = data.pay_summa;
            model.backlog = data.backlog;
            model.discount = data.discount;
            model.filial_id = data.filial_id;
            await model.validate();
            await model.save();
            await this.#inspectionadd(model, registration_inspection,false);
            await this.#doctoradd(model, registration_doctor,false);
            await this.#filesadd(model, registration_files,false);
            await this.#palataadd(model, registration_palata, filial_id,false);
            await this.#payAdd(model, registration_pay,false);
            await this.#queue(false);
            await this.#directAdd(model, false);
            
            res.status(200).send({
                error: false,
                error_code: 200,
                message: 'Malumot chiqdi',
                data: model
            });  
        }catch(e){
            throw new HttpException(500, `Something went wrong ${e}`);
        }

    };
    #directAdd = async(model, insert = true) => {
        if(!insert){
          await this.#deleteDirect(model.id)
        }
        const direct = await directModel.findOne({
           where:{
               id: model.direct_id
           },
           raw: true
       })
        if(direct){
            var directs = {
                "date_time": Math.floor(new Date().getTime() / 1000),
                "type": 0,
                "price": direct != null ? (model.summa * direct.bonus)/100 : 0,
                "doc_id": model.id,
                "doc_type": "kirim",
                "comment": "",
                "place": "Регистрация",
                "direct_id": model.direct_id,
                "filial_id": direct.filial_id
             }
           await registerDirectModel.create(directs);
        }
    }
    #medDirect = async(direc, model, direct, insert = true) =>{
    if(!insert){
        await this.#medDelete(model.id)
    }
    let meds;
    if(direct != null){
            meds = await med_directModel.findOne({
            where:{
                id: direct.med_id
            }
        })
    }
    var med = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "type": 0,
        "price": meds != undefined ? (model.summa * meds.bonus)/100 : 0,
        "doc_id": direc.doc_id,
        "doc_type": "kirim",
        "comment": "",
        "place": "Регистрация",
        "direct_id": direct != null ? direct.med_id : 0
    }
    await registerMedDirectModel.create(med);
    }
    delete = async (req, res, next) => {
        const id = req.params.id;
        
        const result = await ModelModel.destroy({where : {id: id } });
        await this.#deleteDoctor(id);
        await this.#deleteKassa(id);
        await this.#deleteIns(id);
        await this.#deletedoctor(id);
        await this.#deleteRecipe(id);
        await this.#deleteInspection(id);
        await this.#deleteFiles(id);
        await this.#deletePalata(id);
        await this.#deletepay(id);
        await this.#deleteTashxis(id);
        if (!result) {
            throw new HttpException(404, 'Not found');
        }
        res.send('Has been deleted' );
    };
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
    #payAdd = async(model, registration_pay,  insert = true) =>{
        if(!insert){
            await this.#deletepay(model.id);
            await this.#deleteKassa(model.id);
        }
        for(var element of registration_pay){
            var pay = {
                "user_id": element.user_id,
                "date_time": element.date_time,
                "registration_id": model.id,
                "pay_type": element.pay_type,
                "summa": element.summa,
                "discount": element.discount,
                "umumiy_sum": element.umumiy_sum,
                "backlog": element.backlog,
                "comment": element.comment,
                "filial_id": element.filial.id == null ? 0 : element.filial.id
            }
            await Registration_payModel.create(pay);
            // var date_time = Math.floor(new Date().getTime() / 1000);
            
            let type = 0, doc_type = '';
            if(element.pay_type == 'Plastik'){
                type = 0,
                doc_type = 'Kirim'
            }
            else if(element.pay_type == 'Naqt'){
                type = 0,
                doc_type = 'Kirim'
            }
            else if(!element.summa){
                 type = 1,
                 doc_type = 'Kirim'
            }
            else{
                doc_type = 'Kirim'
            }  
            if(model.backlog == 0){
                Register_kassaModel.create({
                    "date_time": element.date_time,
                    "doctor_id": model.id,
                    "pay_type": element.pay_type,
                    "user_id": element.user_id,
                    "filial_id": element.filial.id == null ? 0 : element.filial.id,
                    "price": element.summa,    
                    "type": type,
                    "doc_type": 'Kirim',
                    "place": "Регистрация"
                })
               }
        }
    }
    #inspectionadd = async(model,  registration_inspection, insert = true) => {
        if(!insert){
            await this.#deleteInspection(model.id);
            await this.#deleteIns(model.id)
        }
        var dds;
        registration_inspection.forEach(async item => {
            var {registration_inspection_child, registration_inspection, ...data} = item;
            let user = await UserModel.findOne({
                where:{
                    id: item.user_id
                },
                raw: true
            })
            
            data.registration_id = model.id;
                if(model.backlog == 0){
                    let date_time = Math.floor(new Date().getTime() / 1000);
                    let  tekshiruv = {
                       "date_time": date_time,
                       "type": item.type,
                       "price": Math.floor((item.price * item.inspection.percent_bonus)/100),
                       "doc_id": model.id,
                       "user_id": item.user_id,
                       "inspection_id": item.inspection_id,
                       "inspection_category": item.category_id,
                       "skidka": item.skidka,
                       "doc_type": 'kirim',
                       "place": "Регистрация",
                       "comment": "",
                       "filial_id": item.filial_id == null ? 0 : item.filial_id,
                    }
                   await  Register_inspectionModel.create(tekshiruv)
                    
                function isHave(item) { 
                    return item.room_id == user.room_id&&item.patient_id == model.patient_id;
                }
                var have=await this.q.find(isHave);
                if(have==undefined){
                    this.q.push({"room_id":user.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":data.status});
                }
                else if(data.status!=have.status){
                    if(data.status!='complete'){
                        var index=this.q.findIndex(isHave);
                        this.q[index].status=have.status;
                    }else if(have.status!='complete'){
                        var index=this.q.findIndex(isHave);
                        this.q[index].status=have.status;
                    }
                }
                }
            
            var date = Math.floor(new Date().getTime() / 1000);
            dds={
                "inspection_id":item.inspection_id,  
                "user_id": item.user_id,
                "registration_id":model.id,
                "type":item.type,
                "price": item.price,
                "category_id":item.category_id,
                'status':item.status,
                "date_time": date,
                "skidka": item.skidka,
                "filial_id": item.filial_id == null ? 0 : item.filial_id
            }
            const models = await Registration_inspectionModel.create(dds);    
            await this.#inspectionchildadd(models, registration_inspection_child);
        })
    }
    #inspectionchildadd = async(models, registration_inspection_child) => {
        var dds;
        for(var element of registration_inspection_child){
            dds={
                "parent_id":models.id,
                "text":element.text,
                "norm":element.norm,
                "name":element.name,
                "registration_id":models.registration_id,
                "status":element.status,
                "price":element.price,
                "birlik":element.birlik,
                "rang":element.rang,
                "checked":element.checked,
                "file":element.file}

            await Registration_inspection_childModel.create(dds); 
        }
    }
    #palataadd = async(model, registration_palata, filial_id,  insert = true) =>{
        var palata;
        var date_time = Math.floor(new Date().getTime() / 1000);
        if(!insert){
            await this.#deletePalata(model.id);
        }
        for(let element of registration_palata){
            palata={
                "palata_id": element.palata_id,
                "registration_id":model.id,
                'price':element.price,
                "date_time":date_time,
                "date_do": element.date_do,
                "date_to": element.date_to,
                "day":element.day,
                "filial_id":filial_id == null ? 0 : filial_id,
                "user_id":element.user_id == null ? 0 : element.user_id,
                "total_price":element.total_price};
            await registration_palataModel.create(palata); 
            var date_time = Math.floor(new Date().getTime() / 1000);
            register_palataModel.create({
                "palata_id": element.palata_id,
                "patient_id": model.patient_id,
                "registration_id": model.id,
                "price": element.price,
                "day": element.day,
                "date_to": element.date_to,
                "date_do": element.date_do,
                "date_time": date_time,
                "filial_id": filial_id == null ? 0 : filial_id,
                "user_id": element.user_id == null ? 0 : element.user_id
            })

        }
    }
    #doctoradd = async(model, registration_doctor, insert = true) => {
        if(!insert){
            await this.#deletedoctor(model.id);
            await this.#deleteDoctor(model.id);
        }
        for(var element of registration_doctor){
            let user = await UserModel.findOne({
                where:{
                    doctor_id: element.doctor_id
                },
                raw: true
            })
            
            // Console.log olinmasin 
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            console.log(user.percent)
            var date_time = Math.floor(new Date().getTime() / 1000);
            let doctor = {
                "date_time": date_time,
                "type": 0,
                "price": Math.floor((user.percent * element.price) / 100),
                "doc_id": model.id, 
                "doctor_id": element.doctor_id,
                "filial_id": element.filial_id == null ? 0 : element.filial_id,
                "doc_type": 'kirim',
                "place": "Регистрация",
                "comment": "",
            }
            var {Registration_recipe, register_mkb,...data} = element;
            console.log(element, "doctorrrrrrrr");
            var news={
                "doctor_id":element.doctor_id,
                "registration_id":model.id,
                "price":data.price,
                "status": model.status,
                "text":data.text,
                "category_id":data.category_id,
                "filial_id":data.filial_id == null ? 0 : data.filial_id,
                "date_time": element.date_time
            };
            const models = await Registration_doctorModel.create(news);
                    if(model.backlog == 0){
                        await  RegisterDoctorModel.create(doctor)

                        function isHave(item) { 
                            return item.room_id == user.room_id&&item.patient_id == model.patient_id;
                        }
                        var have=await this.q.find(isHave);
                        if(have==undefined){
                            this.q.push({
                                "room_id":user.room_id,
                                "patient_id":model.patient_id,
                                "number":0,
                                "date_time":Math.floor(new Date().getTime() / 1000),
                                "status":data.status
                            });
                        }else if(data.status!=have.status){
                            if(data.status!='complete'){
                                var index=this.q.findIndex(isHave);
                                this.q[index].status=have.status;
                            } else if(have.status!='complete'){
                                var index=this.q.findIndex(isHave);
                                this.q[index].status=have.status;
                            }
                        }
                    }
            await this.#recieptadd(models, element.registration_recipe, false); 
            await this.#tashxisAdd(model, models, element.register_mkb, false)
        }
    }
    #recieptadd = async(model, registration_recipe, insert = true) => {
        if(!insert){
            await this.#deleteRecipe(model.id);
        }
        var adds;
        for(var element of registration_recipe){
            adds={
                "registration_doctor_id":model.id,
                "registration_id":model.registration_id,
                'pill_id':element.pill_id,
                "time":element.time,
                "day":element.day,
                "comment":element.comment,
                "name": element.name
            };
            await Registration_recipeModel.create(adds);
        }
    }
    #filesadd = async(model, registration_files, insert = true) => {
        if(!insert){
            await this.#deleteFiles(model.id);
        }
        var asas;
        for(var element of registration_files){
            asas={'registration_id':model.id,"href":element.href};
            await Registration_filesModel.create(asas); 
        }
    }
    #tashxisAdd = async(model,models, register_mkb, insert = true) => {
        if(!insert){
            await this.#deleteTashxis(model.id);
        }
        var asas;
        var date_time = Math.floor(new Date().getTime() / 1000);
        for(var element of (register_mkb)){
            asas={
                'registration_id':models.id,
                 "mkb_id": element.mkb_id,
                 "name": element.name,
                 "datetime": date_time,
                 "patient_id": model.patient_id,
                 "doctor_id": element.doctor_id
            };
            await Register_mkb.create(asas); 
        }
    }
    #queue = async(insert=true) => {
        for(var element of this.q){
            if(!insert){
                var has=await QueueModel.findOne({
                    where:{
                        status:{[Op.not]:'complete'},
                        room_id: element.room_id,
                        patient_id: element.patient_id
                    }
                });
                if(has!=null){
                    if(element.status!=has.status){
                        has.status=element.status;
                        await has.save();
                    }
                }else if(element.status!='complete') {
                    var que=await QueueModel.findOne({
                        where:{ 
                            room_id: element.room_id,
                        },
                        order: [
                            ['number', 'DESC']
                        ],
                    });
                    if(que!=null){
                        element.number=que.number+1;
                    }else{
                        element.number=1;
                    }
                    await QueueModel.create(element);
                }
            }else{
                var que=await QueueModel.findOne({
                    where:{ 
                        room_id: element.room_id,
                    },
                    order: [
                        ['number', 'DESC']
                    ],
                });
                if(que!=null){
                    element.number=que.number+1;
                }else{
                    element.number = 1;
                }
                await QueueModel.create(element); 
            }
        } 
        this.q=[];
    }
    #deletedoctor = async(doc_id) =>
     {
        await Registration_doctorModel.destroy({where: {registration_id: doc_id}})
        await Registration_recipeModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteTashxis = async(doc_id) =>
     {
        await Register_mkb.destroy({where: {registration_id: doc_id}})
    }
    #deleteDoctor = async(doc_id) =>
     {
        await RegisterDoctorModel.destroy({where: {doc_id: doc_id}})
    }
    #deleteIns = async(doc_id) =>
     {
        await Register_inspectionModel.destroy({where: {doc_id: doc_id}})
    }
    #medDelete = async(id) => {
        await registerMedDirectModel.destroy({where: {doc_id: id}})
    }
    #deleteKassa = async(doc_id) =>
     {
        await Register_kassaModel.destroy({where: {doctor_id: doc_id}})
    }
    #deleteDirect = async(id) => {
        await registerDirectModel.destroy({where: {doc_id: id}})
    }
    #deleteRecipe = async(doc_id) => {
        await Registration_recipeModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteInspection = async(doc_id) => {
        await Registration_inspectionModel.destroy({where: {registration_id: doc_id}})
        await Registration_inspection_childModel.destroy({where: {registration_id: doc_id}})
    }
    #deletePalata = async(doc_id) => {
        await registration_palataModel.destroy({where: {registration_id: doc_id}})
        await register_palataModel.destroy({where: {registration_id: doc_id}})
    }
    #deletepay = async(doc_id) => {
        await Registration_payModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteFiles = async(doc_id) => {
        await Registration_filesModel.destroy({where: {registration_id: doc_id}})
    }
    palata = async (req, res, next) => {
        let query = {}, query_begin = {}, query_end = {}, body = req.body;
        let data1 = body.date_to;
        let data2 = body.date_do;
        query.date_time = {
            [Op.gte]: body.date_to,
            [Op.lte]: body.date_do,
        }
        query_begin.date_time = {
            [Op.lt]: body.date_to
        }
        query_end.date_time = {
            [Op.lte]: body.date_do
        }
        if(body.filial_id){
            query.filial_id = body.filial_id;
        }
        let result = await palataModel.findAll({
                include:[
                    {model: registration_palataModel, as: 'palatas', attributes: ['id','date_time', 'date_do', 'palata_id'],
                }
                ],
                where: {
                    filial_id: query.filial_id
                }
               })
        result.forEach(value => {
           if(value.dataValues.palatas.length > 0){
            value.dataValues.palatas.forEach(el => {
                if(el.dataValues.date_do >= data1 &&
                    el.dataValues.date_do >= data2
                    ){
                        value.dataValues.status = true;
                    }
                    else if(el.dataValues.date_do >= data1 && el.dataValues.date_time <= data2){
                        value.dataValues.status = true;
                    }
                    else if(el.dataValues.date_do <= data1 && el.dataValues.date_time <= data2){
                        value.dataValues.status = false;
                    }
                    else{
                        value.dataValues.status = false;
                    }
                })
           }
           else{
            value.dataValues.status = false;
           }
            
        })
       
        res.send(result);
    }
    search = async (req, res, next) => {
        let query = {};
        if(req.body.name){
            query.fullname = {[Op.like]: '%'+req.body.name+'%'}
        }
        else{
            query.birthday = {[Op.eq]: req.body.birthday}
        }
        if(req.body.name){
            if(req.body.name.length > 0 ){
                let ModelList = await PatientModel.findAll({
                    include:[
                        {model: RegionModel, as: 'region'},
                        {model: districtModel, as: 'district'}
                    ],
                    where: query,
                    order: [
                        ['name', 'ASC'],
                        ['id', 'ASC']
                    ],
                    limit:1000    
                });
                res.send({
                    "error": false,
                    "error_code": 200,
                    "message": "bemor topildi",
                    data: ModelList
                });
            }
        }
        else if(req.body.birthday){
            let ModelList = await PatientModel.findAll({
                include:[
                    {model: RegionModel, as: 'region'},
                    {model: districtModel, as: 'district'}
                ],
                where: query,
                order: [
                    ['name', 'ASC'],
                    ['id', 'ASC']
                ],
                limit:1000    
            });
            res.send({
                "error": false,
                "error_code": 200,
                "message": "bemor topildi",
                data: ModelList
            });
        }
        else{
            let ModelList = await PatientModel.findAll({
                include:[
                    {model: RegionModel, as: 'region'},
                    {model: districtModel, as: 'district'}
                ],
                order: [
                    ['name', 'ASC'],
                    ['id', 'ASC']
                ],
                limit:1000    
            });
            res.send({
                "error": false,
                "error_code": 200,
                "message": "bemor topildi",
                data: ModelList
            });  
        }
    };
    searchs = async (req, res, next) => {
        let ModelList = await ModelModel.findAll({
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },

                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        }
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include:[
                        {
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                },
                {model: PatientModel, as: 'patient', 
                where:{ 
                    [Op.or]:[
                        {fullname:{  [Op.like]: '%'+req.body.name+'%'}},
                        {birthday: {[Op.eq]: String(req.body.name)}}
                    ]
                },
                include:[
                    {model: RegionModel, as: 'region'},
                    {model: districtModel, as: 'district'}
                ],
            },
            {
                model: UserModel, as: 'user', attributes: ['user_name']
            },
            {
                model: Registration_doctorModel, as: 'registration_doctor',
                include:[
                    {
                        model: Registration_recipeModel, as: 'registration_recipe'
                    }
                ]
            },
            {
                model: Registration_inspectionModel, as: 'registration_inspection',
                include:[
                    {
                        model: Registration_inspection_childModel, as: 'registration_inspection_child'
                    }
                ]
            } 
            ],
            limit:100
        });
        
        if(req.body.name.length == 0){
            let model = await ModelModel.findAll({
                limit: 50,
                include:[
                    {
                        model: UserModel, as: 'user', attributes: ['user_name']
                    },
    
                    {
                        model: Registration_doctorModel, as: 'registration_doctor',
                        include:[
                            {
                                model: Registration_recipeModel, as: 'registration_recipe'
                            }
                        ]
                    },
                    {
                        model: Registration_inspectionModel, as: 'registration_inspection',
                        include:[
                            {
                                model: Registration_inspection_childModel, as: 'registration_inspection_child'
                            }
                        ]
                    },
                    {model: PatientModel, as:'patient',
                    include:[
                        {model: RegionModel, as: 'region'},
                        {model: districtModel, as: 'district'}
                    ],
                   }
                ]
            })
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: model
            });
        }
        else{
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: ModelList
            });
        }
       
    };
    Imtiyozli = async (req, res, next) => {
        let bemor_id = req.body.patient_id;
        let date =Math.floor(new Date().getTime()/1000);      
        const model = await RegistrationModel.findAll({
            attributes: ['user_id', 'direct_id', 'created_at', 'updated_at', 'status', 'patient_id', 
            'type_service', 'complaint','summa','pay_summa','backlog','discount','hospital_summa','tramma_type'],
            where:{
                patient_id: bemor_id
            }
        })
        if(!model){
            throw HttpException(404, "bemor oldin kelmagan")
        }
        if(model.length != 0){
            model.forEach(value => {
                let beshinchiKun = moment(value.created_at*1000).day(8).format();
                let kelganKuni = moment(value.created_at*1000).format();
                let bugungiVaqt = moment(date *1000).format();
                let onBeshinchiKun = moment(value.created_at*1000).day(18).format();
                let birOy = moment(value.created_at*1000).day(31).format();
                if(beshinchiKun > bugungiVaqt && kelganKuni < bugungiVaqt ){
                    let day = "5 kun oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else if(onBeshinchiKun > bugungiVaqt && kelganKuni < bugungiVaqt){
                    let day = "15 kun oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else if(birOy > bugungiVaqt && kelganKuni < bugungiVaqt){
                    let day = "Bir oy oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else{
                    let day = "Bir oydan ortiq";
                    res.send({
                        "error": false,
                        "error_code": 200,
                        "message": "malumot topildi",
                        data: day
                    });
                }
            })
        }
        else{
            res.send({
                "error": false,
                "error_code": 200,
                "message": "malumot topildi",
                data: "Bir oydan ortiq"
            });
        }
    }
    delete = async (req, res, next) => {
        const user = await ModelModel.findOne({
            where:{
                id: req.params.id
            }
        })

        if(user == null){
            throw new HttpException(401, "registratsiya mavjud emas")
        }
        
        await QueueModel.destroy({
            where:{
                patient_id: user.dataValues.patient_id
            }
        })
        await uplataModel.destroy({
            where:{
                user_id: user.dataValues.user_id
            }
        })
        const doctor = await Registration_doctorModel.destroy({
        where:{
            registration_id: req.params.id
        }
        })
        await Registration_filesModel.destroy({
            where:{
            registration_id: req.params.id
            }
        })
        const inspection = await Registration_inspectionModel.destroy({
            where:{
            registration_id: req.params.id
            }
        })
        await Registration_inspection_childModel.destroy({
            where:{
            registration_id: req.params.id
            }
        })
        await Register_inspectionModel.destroy({
            where:{
                doc_id: req.params.id
            }
        })
        await RegisterDoctorModel.destroy({
            where:{
                doc_id: req.params.id
            }
        })
        await register_mkb.destroy({
            where:{
                registration_id: req.params.id
            }
        })
        const pay = await Registration_payModel.destroy({
            where:{
            registration_id: req.params.id
            }
        })
        await Registration_recipeModel.destroy({
            where:{
            registration_id: req.params.id
            }
        })
        await Register_kassaModel.destroy({
                where:{
                    doctor_id: req.params.id,
                    place: 'Регистрация'
                }
        })

        await registration_palataModel.destroy({where: {registration_id: req.params.id}})
        await register_palataModel.destroy({where: {registration_id: req.params.id}})
        
        const model =  await ModelModel.destroy({ 
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
    deleted = async (req, res, next) => {
        let models = await ModelModel.findAll();
        let arxiv = await Registration_arxivModel.findAll();
        if(models.length > 0 || arxiv.length > 0) {
            for(let i = 0; i <= models.length; i++){
                if(models[i] != undefined){
                    await QueueModel.destroy({
                        where:{
                            patient_id: models[i].dataValues.patient_id
                        }
                      })
                      await uplataModel.destroy({
                        where:{
                            user_id: models[i].dataValues.user_id
                        }
                      })
                      await PatientModel.destroy({
                        where:{
                            id: models[i].dataValues.patient_id
                        }
                      })
                      await Registration_doctorModel.destroy({
                        where:{
                            registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_filesModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_inspectionModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_inspection_childModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Register_inspectionModel.destroy({
                        where:{
                            doc_id: models[i].dataValues.id
                        }
                      })
                      await RegisterDoctorModel.destroy({
                        where:{
                            doc_id: models[i].dataValues.id
                        }
                      })
                      await register_mkb.destroy({
                        where:{
                            registration_id: models[i].dataValues.id
                        }
                      })
                      await Registration_payModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_recipeModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Register_kassaModel.destroy({
                        where:{
                            doctor_id: models[i].dataValues.id
                        }
                    })
                    await ModelModel.destroy({ 
                        where:{
                          id: models[i].dataValues.id
                        }
                    });
                      await Registration_doctor_arxivModel.destroy({
                        where:{
                            registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_files_arxivModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_inspection_arxivModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_inspection_child_arxxivModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await register_inspection_arxivModel.destroy({
                        where:{
                            doc_id: models[i].dataValues.id
                        }
                      })
                      await register_doctor_arxivModel.destroy({
                        where:{
                            doc_id: models[i].dataValues.id
                        }
                      })
                      await register_mkb_arxivModel.destroy({
                        where:{
                            registration_id: models[i].dataValues.id
                        }
                      })
                      await Registration_pay_arxivModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await Registration_recipe_arxivModel.destroy({
                        where:{
                         registration_id: models[i].dataValues.id
                        }
                       })
                       await register_kassa_arxivModel.destroy({
                        where:{
                            doctor_id: models[i].dataValues.id
                        }
                    })
                    await Registration_arxivModel.destroy({ 
                        where:{
                          id: models[i].dataValues.id
                        }
                    });
                }
                else{
                    break;
                }
          }
        }
        else{
            throw new HttpException(401, "bazada malumot mavjud emas")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar o\'chirildi'
        });
    }
    queueAll = async (req, res, next) => {
        let query = {}
        let filial_id = req.currentUser.filial_id
        let filialRooms = await RoomModel.findAll({
            where: {
                filial_id
            }
        })

        let alloweRooms = [] 
        for (let room of filialRooms) {
            alloweRooms.push(parseInt(room.dataValues.id));
        }

        query.status = {
            [Op.not]: 'complete'
        }

        query.room_id = {
            [Op.and]: {
                [Op.not]: 0,
                [Op.between]: alloweRooms
            }
        }

        const model = await QueueModel.findAll({
            where: query,
            include:[
                {
                    model: RoomModel, 
                    as: 'room', 
                    attributes: ['name'],
                    include:[
                        {   
                            model: UserModel, 
                            as: 'users', 
                            attributes: ['doctor_id'],
                        include:[
                            {
                                model: DoctorModel, 
                                as: 'doctor', 
                                attributes: ['name']
                            }
                        ]
                    }
                    ]
                },
                {
                    model: PatientModel, 
                    as: 'patient', 
                    attributes: ['fullname']
                },
            ],
            order: [
                ['number', 'ASC'],
                ['room_id', 'ASC'],
            ],
            group:['room_id'],
        });
        
        res.send({
            error_code: 200,
            error: false,
            message: "malumotlar chiqdi",
            data: model
        })
    }
    statsionarHisobot = async(req, res, next) => {
        let query = {};
        query.created_at = {
            [Op.gte]: req.body.datetime1,
            [Op.lte]: req.body.datetime2,
        }
        query.type_service = {
            [Op.eq]: 'Statsionar'
        }
        const model =  await RegistrationModel.findAll({
            where: query,
            include: [
                {model: PatientModel, as: 'patient', attributes: ['fullname']}
            ]
        })
      res.send({
        error_code: 201,
        error: false,
        message: "malumotlar chiqdi", 
        data: model
      })
    }
    birkunliKassa = async(req, res, next) => {
        let date = new Date(), query = {}; 
      let vaqt1 =  moment(date).startOf('day').unix();
      let vaqt2  = moment(date).endOf('day').unix();
       query.date_time = {
        [Op.gte]: vaqt1,
        [Op.lte]: vaqt2
       }
        const model = await Register_kassaModel.findAll({
            attributes : [ 
                'id', 'doctor_id', "type", "date_time", "doc_type",
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + vaqt1 + " and register_kassa.doc_type = 'Kirim' THEN register_kassa.price * power(-1, 'type') ELSE 0 END)"), 'kirim'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + vaqt1 + " and register_kassa.doc_type = 'Chiqim' THEN register_kassa.price * power(-1, 'type') ELSE 0 END)"), 'chiqim'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + vaqt1 + " and register_kassa.date_time <= " + vaqt2 + " AND register_kassa.doc_type = 'Kirim' and pay_type = 'Plastik' THEN register_kassa.price ELSE 0 END)"), 'plasKirim'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + vaqt1 + " and register_kassa.date_time <= " + vaqt2 + " AND register_kassa.doc_type = 'chiqim' and pay_type = 'Plastik' THEN register_kassa.price ELSE 0 END)"), 'plasChiqim'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + vaqt1 + " and register_kassa.date_time <= " + vaqt2 + " AND register_kassa.doc_type = 'Kirim' and (pay_type = 'Naqd' || pay_type = 'Naqt') THEN register_kassa.price ELSE 0 END)"), 'naqdKirim'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + vaqt1 + " and register_kassa.date_time <= " + vaqt2 + " AND register_kassa.doc_type = 'chiqim' and (pay_type = 'Naqd' || pay_type = 'Naqt') THEN register_kassa.price ELSE 0 END)"), 'naqdChiqim'],
            ],
            group: [
                ['doctor_id']
            ]
        })
        res.send(model)
    }
}



module.exports = new RegistrationController;