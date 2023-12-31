const DoctorModel = require("../../models/doctor.model");
const palataModel = require("../../models/palata.model");
const pastavchikModel = require("../../models/pastavchik.model");
const reagentModel = require("../../models/reagent.model");
const reagentDepartmentModel = require("../../models/reagent_department.model");
const register_directModel = require("../../models/register_direct.model");
const register_doctorModel = require("../../models/register_doctor.model");
const Register_inspectionModel = require("../../models/register_inspection.model");
const Register_kassaModel = require("../../models/register_kassa.model");
const register_kirish = require("../../models/register_kirish.model");
const register_bassen = require("../../models/register_bassen.model");
const register_med_directModel = require("../../models/register_med_direct.model");
const register_reagentModel = require("../../models/register_reagent.model");
const register_supplierModel = require("../../models/register_supplier.model");
const registration_palataModel = require("../../models/registration_palata.model");
const doctorCategory = require("../../models/doctor_category.model");
const inspectionCategory = require("../../models/inspector_category.model");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const RegistrationModel = require("../../models/registration.model");
const PatientModel = require("../../models/patient.model");
const directModel = require("../../models/direct.model");
const med_directModel = require("../../models/med_direct.model");
const UserModel = require("../../models/user.model");
const Inspection_categoryModel = require("../../models/inspector_category.model");
const db = require('../../db/db-sequelize')

class HisobotController {
    directSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.direct_id !== null) {
            query.id = { [Op.eq]: body.direct_id }
            queryx.direct_id = { [Op.eq]: body.direct_id }
            queryx.filial_id = { [Op.eq]: body.filial_id }
        } else {
            queryx.filial_id = { [Op.eq]: body.filial_id }
        }
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id", "comment", "place", "doc_type",
                [sequelize.literal('direct.name'), 'direct_name'],
                [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN register_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
            ],
            include: [
                { model: directModel, as: 'direct', attributes: [] }
            ],
            where: queryx,
            group: ['id'],
            order: [
                ['id', 'DESC']
            ]

        })
        model.forEach(val => {
            if (val.dataValues.end_total == 0) {
                model = [];
                model.push(val)
            }
        })
        res.send(model)
    };

    medHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.direct_id !== null) {
            query.id = { [Op.eq]: body.direct_id }
            queryx.direct_id = { [Op.eq]: body.direct_id }
        };
        let model = await register_med_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id", "comment", "place", "doc_type",
                [sequelize.literal('med_direct.name'), 'med_name'],
                [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("COUNT(Case WHEN register_med_direct.date_time >=" + datetime1 + " and register_med_direct.date_time <= " + datetime2 + ` and register_med_direct.direct_id != null then register_med_direct.direct_id else 0 end)`), 'count']
            ],
            include: [
                { model: med_directModel, as: 'med_direct', attributes: [] }
            ],
            where: queryx,
            group: ['direct_id']
        })
        res.send(model)
    };

    medSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.direct_id !== null) {
            query.id = { [Op.eq]: body.direct_id }
            queryx.direct_id = { [Op.eq]: body.direct_id }
        };
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_med_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id", "comment", "place", "doc_type",
                [sequelize.literal('med_direct.name'), 'med_name'],
                [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
            ],
            include: [
                { model: med_directModel, as: 'med_direct', attributes: [] }
            ],
            where: queryx,
            group: ['id'],
            order: [
                ['id', 'DESC']
            ]

        })
        res.send(model)
    };

    directHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if (body.direct_id !== null) {
            query.id = { [Op.eq]: body.direct_id }
            queryx.direct_id = { [Op.eq]: body.direct_id }
            queryx.filial_id = { [Op.eq]: body.filial_id }
        } else {
            queryx.filial_id = { [Op.eq]: body.filial_id }
        }
        let model = await register_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id", "comment", "place", "doc_type",
                [sequelize.literal('direct.name'), 'direct_name'],
                [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("COUNT(Case WHEN register_direct.date_time >=" + datetime1 + " and register_direct.date_time <= " + datetime2 + ` and register_direct.direct_id = ${body.direct_id} then register_direct.direct_id else 0 end)`), 'count']
            ],
            include: [
                { model: directModel, as: 'direct', attributes: [] }
            ],
            where: queryx,
            group: ['direct_id']
        })
        model.forEach(val => {
            if (val.dataValues.id == null) {
                model = [];
                model.push(val)
            }
        })
        res.send(model)
    };

    inspection = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if (body.filial_id != null && body.inspection_category == null) {
            query.filial_id = { [Op.eq]: body.filial_id }
        }
        else if (body.filial_id != null && body.inspection_category != null) {
            query.inspection_category = { [Op.eq]: body.inspection_category },
                query.filial_id = { [Op.eq]: body.filial_id }
        }

        let result = await Register_inspectionModel.findAll({
            attributes: [
                'id', "type", "date_time", "inspection_category", "doc_id", "comment", "user_id",
                [sequelize.fn("COUNT", sequelize.col("user_id")), "count"],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'total_chiqim'],
            ],
            include: [
                { model: Inspection_categoryModel, as: 'inspection', attributes: ['name', 'id'] },
            ],
            where: query,
            raw: true,
            group: ['inspection_category'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(result);
    };

    inspectionSalary = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;

        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        
        
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        
        if (body.filial_id) {
            query.filial_id = { [Op.eq]: body.filial_id }
        }
        
        if(body.user_id) {
            query.user_id = parseInt(body.user_id)
        }

        let result = await Register_inspectionModel.findAll({
            attributes: [
                'id', "type", "date_time", "inspection_category", "doc_id", "comment", "user_id",
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'total_chiqim'],
            ],
            include: [
                { model: Inspection_categoryModel, as: 'inspection', attributes: ['name', 'id'] },
            ],
            where: query,
            raw: true,
            group: ['inspection_category'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(result);
    };

    InspectionSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;

        if (body.filial_id) {
            queryx.filial_id = body.filial_id;
        }

        if (body.inspection_category) {
            queryx.inspection_category = body.inspection_category;
        }

        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        
        const model = await Register_inspectionModel.findAll({
            attributes: ['doc_type', 'id', 'date_time', "doc_id", "comment", "inspection_id", "place", "user_id",
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'chiqim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            group: ['doc_id'],
            where: queryx,
            order: [
                ['id', 'DESC']
            ]
        })
        res.send(model)
    }

    kassaSverka = async (req, res, next) => {
        let result, results;
        let body = req.body;
        let query = {}, query_begin = {}, query_end = {}, queryx = {};
        query_begin.date_time = {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time = {
            [Op.lte]: body.datetime2,
        };
        let datetime1 = body.datetime1,
            datetime2 = body.datetime2
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if (body.user_id) {
            query.user_id = body.user_id
        } 
        if(body.filial_id) {
            query.filial_id = body.filial_id
        }
        result = await Register_kassaModel.findAll({
            attributes: ['doc_type', 'pay_type', 'id', 'date_time', "doctor_id", "place", `price`,
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` < " + datetime1 + " THEN `register_kassa`.`price` * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'kirim' and `register_kassa`.`pay_type` = 'Naqt' THEN `register_kassa`.`price` ELSE 0 END)"), 'kirim_naqt'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'kirim' and `register_kassa`.`pay_type` = 'Clik' THEN `register_kassa`.`price` ELSE 0 END)"), 'klik'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'kirim' and `register_kassa`.`pay_type` = 'Plastik' THEN `register_kassa`.`price` ELSE 0 END)"), 'kirim_plastik'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'chiqim' and `register_kassa`.`pay_type` = 'Plastik' THEN `register_kassa`.`price` ELSE 0 END)"), 'chiqim_plastik'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'chiqim' and `register_kassa`.`pay_type` = 'Naqt' THEN `register_kassa`.`price` ELSE 0 END)"), 'chiqim_naqt'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` <= " + datetime2 + " THEN `price` * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            include: [
                {
                    model: RegistrationModel, as: 'registration', attributes: ['id'],
                    include: [
                        { model: PatientModel, as: 'patient', attributes: ['fullname'] }
                    ],

                },
                {
                    model: UserModel, as: 'user', attributes: ['id', 'user_name']
                }
            ],
            where: query,
            order: [
                ['id', 'DESC']
            ],
            group: ['id']
        })
        res.send(result);
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
        let result = await palataModel.findAll({
            include: [
                { model: registration_palataModel, as: 'palatas', attributes: ['id', 'date_time', 'date_do', 'palata_id'], }
            ],
            raw: true
        })
        result.forEach(value => {
            if (value.dataValues.palatas.length > 0) {
                value.dataValues.palatas.forEach(el => {
                    if (el.dataValues.date_do >= data1 &&
                        el.dataValues.date_do >= data2
                    ) {
                        value.dataValues.status = true;
                    }
                    else if (el.dataValues.date_do >= data1 && el.dataValues.date_time <= data2) {
                        value.dataValues.status = true;
                    }
                    else if (el.dataValues.date_do <= data1 && el.dataValues.date_time <= data2) {
                        value.dataValues.status = false;
                    }
                    else {
                        value.dataValues.status = false;
                    }
                    // console.log("if4", value.dataValues);
                })
            }
            else {
                value.dataValues.status = false;
            }

        })

        res.send(result);
    }

    doctorHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.doctor_id !== null) {
            queryx.id = { [Op.eq]: body.doctor_id }
            query.doctor_id = { [Op.eq]: body.doctor_id }
        };
        let result = await register_doctorModel.findAll({
            attributes: [
                'id', "type", "date_time", "doc_id", "comment", "place",
                [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
            ],
            include: [
                { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'], where: queryx },
            ],
            where: query,
            raw: true,
            group: ['doctor_id'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(result);
    };

    TekshiruvSoni = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if (body.inspection_category !== null) {
            query.id = { [Op.eq]: body.inspection_category }
            queryx.inspection_category = { [Op.eq]: body.inspection_category }
        };
        const model = await Register_inspectionModel.findAll({
            attributes: [
                [sequelize.fn("COUNT", sequelize.col("registration.patient_id")), "count"]
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name'], where: query },
                { model: RegistrationModel, as: 'registration', attributes: ['patient_id'] }
            ],
            where: queryx
        })
        res.send(model)
    }

    DoctorSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.doctor_id !== null) {
            queryx.id = { [Op.eq]: body.doctor_id }
            query.doctor_id = { [Op.eq]: body.doctor_id }
        };
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        const model = await register_doctorModel.findAll({
            attributes: ['doc_type', 'id', 'date_time', "doc_id", "comment", "doctor_id", "place",
                [sequelize.literal("SUM(CASE WHEN register_doctor.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'kirim'],
                [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'chiqim'],
                [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
            ],
            where: query,
            group: ['id'],
            order: [
                ['id', 'DESC']
            ]
        })
        res.send(model)
    }

    pastavchikSverka = async (req, res, next) => {
        let body = req.body;
        let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.pastavchik_id !== null) {
            query.id = { [Op.eq]: body.pastavchik_id }
            queryx.pastavchik_id = { [Op.eq]: body.pastavchik_id }

        };
        if (body.filial_id != null && body.pastavchik_id == null) {
            queryx.filial_id = { [Op.eq]: body.filial_id }
        }
        else if (body.filial_id != null && body.pastavchik_id != null) {
            queryx.pastavchik_id = { [Op.eq]: body.pastavchik_id },
                queryx.filial_id = { [Op.eq]: body.filial_id }
        }
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_supplierModel.findAll({
            attributes: [
                'id', 'pastavchik_id', "type", "date_time", "doc_type", "summa", "doc_id", "place", "comment",
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            where: queryx,
            group: ['id'],
            order: [
                ['id', 'DESC']
            ]
        })
        res.send(model)
    }

    pastavchikHisobot = async (req, res, next) => {
        let body = req.body;
        let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.pastavchik_id !== null) {
            query.id = { [Op.eq]: body.pastavchik_id }
            queryx.pastavchik_id = { [Op.eq]: body.pastavchik_id }

        };
        if (body.filial_id != null && body.pastavchik_id == null) {
            queryx.filial_id = { [Op.eq]: body.filial_id }
        }
        else if (body.filial_id != null && body.pastavchik_id != null) {
            queryx.pastavchik_id = { [Op.eq]: body.pastavchik_id },
                queryx.filial_id = { [Op.eq]: body.filial_id }
        }

        let model = await register_supplierModel.findAll({
            attributes: [
                'id', 'doc_id', "type", "date_time", "doc_type", "summa", "pastavchik_id", "place",
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            include: [
                { model: pastavchikModel, as: 'pastavchik' }
            ],
            where: queryx,
            group: ['pastavchik_id']
        })
        res.send(model)
    }

    Hisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.reagent_id !== null) {
            query.id = { [Op.eq]: body.reagent_id }
            queryx.reagent_id = { [Op.eq]: body.reagent_id }
        };
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_reagentModel.findAll({
            attributes: [
                'id', "price", "date_time", "doc_id", "count", "summa", "reagent_id", "doc_type",
                [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'kirim' THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'chiqim' THEN register_reagent.summa ELSE 0 END)`), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
            ],
            include: [
                {
                    model: reagentDepartmentModel, as: 'reagent_department',
                    include: [
                        { model: reagentModel, as: 'reagent' },
                        // {model: departmentModel, as:'department'}
                    ]
                },
                { model: reagentModel, as: 'reagent' }
            ],
            where: queryx,
            group: ['reagent_id']
        })
        res.send(model)
    }

    Sverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if (body.reagent_id !== null) {
            query.id = { [Op.eq]: body.reagent_id }
            queryx.reagent_id = { [Op.eq]: body.reagent_id }
        };
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_reagentModel.findAll({
            attributes: [
                'id', "price", "date_time", "doc_id", "count", "summa", "reagent_id", "doc_type",
                [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'kirim' THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'chiqim' THEN register_reagent.summa ELSE 0 END)`), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
            ],
            include: [
                {
                    model: reagentDepartmentModel, as: 'reagent_department',
                    include: [
                        { model: reagentModel, as: 'reagent' },
                        { model: doctorCategory, as: 'department' }
                    ]
                },
                { model: reagentModel, as: 'reagent' }
            ],
            where: queryx,
            group: ['id'],
            order: [
                ['id', 'DESC']
            ]
        })
        res.send(model)
    }

    kirishHisobot = async (req, res, next) => {
        let result, results;
        let body = req.body;
        let query = {}, query_begin = {}, query_end = {}, queryx = {};
        query_begin.date_time = {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time = {
            [Op.lte]: body.datetime2,
        };
        let datetime1 = body.datetime1,
            datetime2 = body.datetime2
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }

        result = await register_kirish.findAll({
            where: query,
            order: [
                ['id', 'DESC']
            ],
            group: ['id']
        })
        res.send(result);
    }

    BassenSverka = async (req, res, next) => {
        let result, results;
        let body = req.body;
        let query = {}, query_begin = {}, query_end = {}, queryx = {};

        query_begin.date_time = {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time = {
            [Op.lte]: body.datetime2,
        };

        let datetime1 = body.datetime1,
            datetime2 = body.datetime2
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }

        result = await register_bassen.findAll({
            where: query,
            order: [
                ['id', 'DESC']
            ],
            group: ['id']
        })
        res.send(result);
    }

    genderCountBemor = async (req, res) => {       
        const [results, metadata] = await db.query(`
            SELECT 
                SUM(CASE WHEN gender = 'Erkak' THEN 1 ELSE 0 END) AS maleCount,
                SUM(CASE WHEN gender = 'Ayol' THEN 1 ELSE 0 END) AS femaleCount
            FROM patient
        `);

        const [counts] = results;
        res.send(counts);
    }

    countAS = async (req, res) => {    
        let role = req.currentUser.role
        let filial_id = req.currentUser.filial_id

        let query = `
            SELECT 
                SUM(CASE WHEN type_service = 'Statsionar' THEN 1 ELSE 0 END) AS statsionar,
                SUM(CASE WHEN type_service = 'Ambulator' THEN 1 ELSE 0 END) AS ambulator
            FROM registration
        `;

        if (role === 'Admin') {
            if (req.body.filial_id) {
                query += `WHERE filial_id = ${req.body.filial_id}`; 
            }
        } else {
            query += `WHERE filial_id = ${filial_id}`;
        }

        const [results, metadata] = await db.query(query);

        const [counts] = results;
        res.send(counts);
    }

    countWorker = async (req, res) => {
        let role = req.currentUser.role
        let filial_id = req.currentUser.filial_id

        let sql = `
            SELECT 
                SUM(CASE WHEN role = 'Kasser' THEN 1 ELSE 0 END) AS kassir,
                SUM(CASE WHEN role = 'Loborant' THEN 1 ELSE 0 END) AS laborant,
                SUM(CASE WHEN role = 'Shifokor' THEN 1 ELSE 0 END) AS shifokor,
                SUM(CASE WHEN role = 'Registrator' THEN 1 ELSE 0 END) AS registrator
            FROM user
        `;

        if (role === 'Admin') {
            if (req.body.filial_id) {
                sql += `WHERE filial_id = ${req.body.filial_id}`; 
            }
        } else {
            sql += `WHERE filial_id = ${filial_id}`;
        }

        const [results, metadata] = await db.query(sql);

        const [counts] = results;
        res.send(counts);
    }

    countTekshiruvDoktor = async (req, res) => {
        let role = req.currentUser.role;
        let filial_id;
    
        if (role == 'Admin') {
            filial_id = req.body.filial_id;
        } else {
            filial_id = req.currentUser.filial_id;
        }
    
        const currentYear = new Date().getFullYear();
    
        function generateMonthArray() {
            const months = [];
            for (let i = 1; i <= 12; i++) {
                months.push(i);
            }
            return months;
        }
    
        let query = `
            SELECT 
                u.user_name as user_id,
                DATE_FORMAT(FROM_UNIXTIME(rd.date_time), '%m') AS month,
                COUNT(*) AS record_count
            FROM 
                register_doctor rd
            JOIN 
                user u ON rd.doctor_id = u.doctor_id
            WHERE
                YEAR(FROM_UNIXTIME(rd.date_time)) = :currentYear
        `;
    
        if (role === 'Admin') {
            if (req.body.filial_id) {
                query += ` AND rd.filial_id = :filial_id`;
            }
        } else {
            query += ` AND rd.filial_id = :filial_id`;
        }
        
        query += `
            GROUP BY u.id, month
        `;

        db.query(query, {
            replacements: { currentYear, filial_id },
            type: db.QueryTypes.SELECT
        }).then(results => {
            const monthArray = generateMonthArray();
            const formattedResults = {};
    
            results.forEach(row => {
                const userId = row.user_id;
                const month = parseInt(row.month, 10);
    
                if (!formattedResults[userId]) {
                    formattedResults[userId] = Array.from({ length: 12 }).fill(0);
                }
    
                formattedResults[userId][month - 1] = row.record_count;
            });
    
            const finalResult = Object.keys(formattedResults).map(userId => ({
                name: `${userId}`,
                data: formattedResults[userId]
            }));

            res.send(finalResult)
        }).catch(error => {
            console.error(error);
        });
    }

    countTekshiruvLaborant = async (req, res) => {
        let role = req.currentUser.role;
        let filial_id;
    
        if (role == 'Admin') {
            filial_id = req.body.filial_id;
        } else {
            filial_id = req.currentUser.filial_id;
        }

        const currentYear = new Date().getFullYear();
        function generateMonthArray() {
            const months = [];
            for (let i = 1; i <= 12; i++) {
                months.push(i);
            }
            return months;
        }
        
        let query = `
            SELECT 
                u.user_name as user_id,
                DATE_FORMAT(FROM_UNIXTIME(rd.date_time), '%m') AS month,
                COUNT(*) AS record_count
            FROM 
                register_inspection rd
            JOIN 
                user u ON rd.user_id = u.id
            WHERE
                YEAR(FROM_UNIXTIME(rd.date_time)) = :currentYear
        `;    

        if (role === 'Admin') {
            if (req.body.filial_id) {
                query += ` AND rd.filial_id = :filial_id`;
            }
        } else {
            query += ` AND rd.filial_id = :filial_id`;
        }

        query += `
            GROUP BY 
                u.id, month
        `;

        db.query(query, {
            replacements: { currentYear, filial_id },
            type: db.QueryTypes.SELECT
        }).then(results => {
            const monthArray = generateMonthArray();
            const formattedResults = {};
        
            results.forEach(row => {
                const userId = row.user_id;
                const month = parseInt(row.month, 10);
        
                if (!formattedResults[userId]) {
                    formattedResults[userId] = Array.from({ length: 12 }).fill(0);
                }
        
                formattedResults[userId][month - 1] = row.record_count;
            });
        
            const finalResult = Object.keys(formattedResults).map(userId => ({
                name: `${userId}`,
                data: formattedResults[userId]
            }));
        
            res.send(finalResult)
        }).catch(error => {
            console.error(error);
        });
    }

    countKoriklarSoni = async (req, res) => {
        const currentYear = new Date().getFullYear();
        let role = req.currentUser.role;
        let filial_id;
    
        if (role == 'Admin') {
            filial_id = req.body.filial_id;
        } else {
            filial_id = req.currentUser.filial_id;
        }

        function generateMonthArray() {
            const months = [];
            for (let i = 1; i <= 12; i++) {
                months.push(i);
            }
            return months;
        }

        let query = `
            SELECT 
                DATE_FORMAT(FROM_UNIXTIME(rd.created_at), '%m') AS month,
                COUNT(*) AS record_count
            FROM 
                registration_arxiv rd
            WHERE
                YEAR(FROM_UNIXTIME(rd.created_at)) = :currentYear
        `;

        if (role === 'Admin') {
            if (req.body.filial_id) {
                query += ` AND rd.filial_id = :filial_id`;
            }
        } else {
            query += ` AND rd.filial_id = :filial_id`;
        }

        query += `
            GROUP BY month
        `;

        db.query(query, {
            replacements: { currentYear, filial_id },
            type: db.QueryTypes.SELECT
        }).then(results => {
            const monthArray = generateMonthArray();
            const formattedResults = {};

            results.forEach(row => {
                const month = parseInt(row.month, 10);

                if (!formattedResults[month]) {
                    formattedResults[month] = 0;
                }

                formattedResults[month] = row.record_count;
            });

            const finalResult = monthArray.map(month => ({
                name: `${month}`,
                data: [formattedResults[month] || 0]
            }));

            const mergedData = finalResult.reduce((acc, curr) => acc.concat(curr.data), []);
            let arr = [{}]
            arr[0].name = "Кўриклар сони"
            arr[0].data = mergedData
            res.send(arr);
        }).catch(error => {
            console.error(error);
        });
    }
}


module.exports = new HisobotController;