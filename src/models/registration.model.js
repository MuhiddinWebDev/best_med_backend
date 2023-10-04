const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db-sequelize");
const Registration_doctorModel = require("./registration_doctor.model");
const Registration_inspectionModel = require("../models/registration_inspection.model");
const UserModel = require("./user.model");
const Register_kassaModel = require("./register_kassa.model");
const PatientModel = require("./patient.model");
const DoctorModel = require("./doctor.model");
const directModel = require("./direct.model");
// const Registration_inspection_childModel = require('./registration_inspection_child.model');
// const palataModel = require('./palata.model');
const registration_palataModel = require("./registration_palata.model");
const Registration_filesModel = require("./registration_files.model");
const Registration_payModel = require("./registration_pay.model");
const register_mkb = require("./register_mkb.model");
const register_palataModel = require("./register_palata.model");
const FilialModel = require("./filial.model");

class RegistrationModel extends Model {
  toJSON() {
    //Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

RegistrationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(new Date().getTime() / 1000),
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(new Date().getTime() / 1000),
    },
    status: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
    },
    type_service: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    complaint: {
      type: DataTypes.TEXT,
    },
    summa: {
      type: DataTypes.DECIMAL(30),
    },
    pay_summa: {
      type: DataTypes.DECIMAL(30),
    },
    backlog: {
      type: DataTypes.DECIMAL(30),
    },
    discount: {
      type: DataTypes.DECIMAL(30),
    },
    hospital_summa: {
      type: DataTypes.DECIMAL(),
    },
    direct_id: {
      type: DataTypes.INTEGER,
    },
    filial_id:{
      type: DataTypes.INTEGER
    },
    tramma_type: {
      type: DataTypes.STRING(),
    },
  },
  {
    sequelize,
    modelName: "registration",
    tableName: "registration",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

register_palataModel.belongsTo(RegistrationModel, {as: "registration", foreignKey: "registration_id"});
RegistrationModel.hasMany(registration_palataModel, {as: "registration_palata", foreignKey: "registration_id"});
Register_kassaModel.belongsTo(RegistrationModel, {as: "registration",foreignKey: "doctor_id",});
RegistrationModel.hasMany(Registration_doctorModel, {as: "registration_doctor",foreignKey: "registration_id",});
RegistrationModel.hasMany(Registration_inspectionModel, {as: "registration_inspection",foreignKey: "registration_id",});
RegistrationModel.hasMany(Register_kassaModel, {as: "register_kassa",foreignKey: "doctor_id",});
RegistrationModel.hasMany(Registration_filesModel, {as: "registration_files",foreignKey: "registration_id",});
RegistrationModel.belongsTo(PatientModel, {as: "patient", foreignKey: "patient_id",});
RegistrationModel.belongsTo(DoctorModel, { as: "doctor", foreignKey: "id" });
RegistrationModel.belongsTo(UserModel, { as: "user", foreignKey: "user_id" });
RegistrationModel.belongsTo(directModel, {as: "direct", foreignKey: "direct_id", });
RegistrationModel.hasMany(Registration_payModel, {as: "registration_pay", foreignKey: "registration_id",});
RegistrationModel.belongsTo(FilialModel, {as: 'filial', foreignKey: 'filial_id'});

module.exports = RegistrationModel;
