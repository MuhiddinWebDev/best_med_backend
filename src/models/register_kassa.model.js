const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorModel = require('./doctor.model');
const UserModel = require('./user.model');
const RegistrationModel = require('./registration.model');
class Register_kassaModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Register_kassaModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 type: {
   type: DataTypes.STRING(400),
   allowNull: false
 },
 price:{
   type: DataTypes.DECIMAL(),
   allowNull: false
 },
 pay_type:{
   type: DataTypes.STRING,
   allowNull: false
 },
 doc_type:{
  type: DataTypes.STRING
 },
 doctor_id:{
   type: DataTypes.INTEGER
 },
 filial_id:{
  type: DataTypes.INTEGER
},
user_id:{
  type: DataTypes.INTEGER
},
 place:{
  type:DataTypes.STRING()
 }

}, {
  sequelize,
  modelName: 'register_kassa',
  tableName: 'register_kassa',
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
  ],
 
});
Register_kassaModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
Register_kassaModel.belongsTo(UserModel, {as: 'user', foreignKey: 'user_id'})
// Register_kassaModel.belongsTo(RegistrationModel, {as: 'registration', foreignKey: 'doctor_id'})
module.exports = Register_kassaModel;