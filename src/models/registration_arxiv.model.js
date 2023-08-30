const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const Registration_doctorModel = require('./registration_doctor_arxiv.model');
const Registration_inspectionModel = require('../models/registration_inspection_arxiv.model')
const UserModel = require('./user.model');
// const Register_kassaModel = require('./register_kassa.model');
const PatientModel = require('./patient.model');
const DoctorModel = require('./doctor.model');
// const Registration_inspection_childModel = require('./registration_inspection_child.model');
// const palataModel = require('./palata.model');
const registration_palataModel = require('./registration_palata_arxiv.model');
const Registration_filesModel = require('./registration_files_arxiv.model');
const Registration_payModel = require('./registration_pay_arxiv.model');
const register_mkb = require('./register_mkb.model');

class Registration_arxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_arxivModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
user_id: {
    type: DataTypes.INTEGER
},
created_at : {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: Math.floor(new Date().getTime() / 1000)

},
updated_at : {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: Math.floor(new Date().getTime() / 1000)
},
status : {
    type: DataTypes.STRING(),
    allowNull: false
},
patient_id : {
    type: DataTypes.INTEGER
},
type_service : {
    type: DataTypes.STRING(),
    allowNull: false
},
complaint : {
    type: DataTypes.STRING,
},
summa : {
    type: DataTypes.DECIMAL(30),
},
pay_summa : {
    type: DataTypes.DECIMAL(30),
},
backlog : {
    type: DataTypes.DECIMAL(30),
},
discount : {
    type: DataTypes.DECIMAL(30)
},
hospital_summa:{
    type: DataTypes.DECIMAL()
},
direct_id:{
    type: DataTypes.INTEGER
},
imtiyoz_type:{
    type: DataTypes.STRING() 
}

}, {
  sequelize,
  modelName: 'registration_arxiv',
  tableName: 'registration_arxiv',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
        name: "PRIMARY",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "PRIMARY",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
      {
        name: "PRIMARY",
        using: "BTREE",
        fields: [
          { name: "direct_id" },
        ]
      }
  ],
   
});
// Register_kassaModel.belongsTo(Registration_arxivModel, {as: 'registrations', foreignKey: 'doctor_id'})
Registration_arxivModel.hasMany(Registration_doctorModel, {as: 'registration_doctor', foreignKey: 'registration_id'})
Registration_arxivModel.hasMany(Registration_inspectionModel, {as: 'registration_inspection', foreignKey: 'registration_id'})
// Registration_arxivModel.hasMany(Registration_inspection_childModel, {as: 'registration_inspection_child', foreignKey: 'id'})
// Registration_arxivModel.hasMany(Register_kassaModel, {as: 'register_kassas', foreignKey: 'doctor_id'})
Registration_arxivModel.hasMany(Registration_filesModel, {as: 'registration_files', foreignKey: 'registration_id'})
Registration_arxivModel.belongsTo(PatientModel, {as: 'patient', foreignKey: 'patient_id'})
Registration_arxivModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'id'})
Registration_arxivModel.belongsTo(UserModel, {as: 'user', foreignKey: 'user_id'})
Registration_arxivModel.hasMany(registration_palataModel, {as: 'registration_palata', foreignKey: 'registration_id'});
Registration_arxivModel.hasMany(Registration_payModel, {as: 'registration_pay', foreignKey: 'registration_id'});
module.exports = Registration_arxivModel;