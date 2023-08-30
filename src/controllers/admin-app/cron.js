const cron = require("node-cron");
const ModelModel = require("../../models/registration.model");
const db = require('../../db/db-sequelize');
const moment = require('moment');
const { Op } = require("sequelize");
module.exports = function(){
    cron.schedule('*/20 * * * *', () => {
        this.setArchive();
    },
    {
        scheduled: true,
        timezone: "Asia/Tashkent"
    }
    )
    setArchive= async (req, res, next) => {
        let date = Math.floor(new Date().getTime())
        let vaqt1 =  moment(date).startOf('day').unix();
        var MyDatas  =  await ModelModel.findAll({
            where:{
                type_service: 'Ambulator',
                backlog: 0,
                created_at: {[Op.lt]: vaqt1}
            }
        });
        if(MyDatas.length > 0){
            MyDatas.forEach(async item => {
                if(item.created_at < vaqt1){
                    await db.query(`INSERT INTO registration_inspection_child_arxiv SELECT * FROM registration_inspection_child where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_inspection_child where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_inspection_arxiv SELECT * FROM registration_inspection where registration_id = ${item.dataValues.id}`);        
                await db.query(`DELETE from registration_inspection where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_files_arxiv SELECT * FROM registration_files where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_files where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_recipe_arxiv SELECT * FROM registration_recipe where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_recipe where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_doctor where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_arxiv SELECT * FROM registration where id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration where id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_pay_arxiv SELECT * FROM registration_pay where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_pay where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_palata_arxiv SELECT * FROM registration_palata where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_palata where registration_id = ${item.dataValues.id}`);          
                await db.query(`TRUNCATE TABLE queue`);
                }
                else{
                    console.log("oldin kelgan bemorlar mavjud emas");
                }
            })
        }
    
        // res.send({
        //     message: "Malumot arxivga olindi",
        // });
       };
}

