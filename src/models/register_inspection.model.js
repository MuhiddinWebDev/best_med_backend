const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const InspectionCategory = require('./inspector_category.model')
const RegistrationModel = require('./registration.model');
const UserModel = require('./user.model');
class Register_inspectionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Register_inspectionModel.init({
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
   type: DataTypes.STRING(400)
 },
 price:{
   type: DataTypes.DECIMAL()
 },
 doc_id:{
   type: DataTypes.INTEGER
 },
 user_id:{
  type: DataTypes.INTEGER
},
inspection_id:{
  type: DataTypes.INTEGER
},
inspection_category:{
  type: DataTypes.INTEGER,
},
doc_type:{
  type: DataTypes.STRING()
},
comment:{
  type: DataTypes.STRING()
},
filial_id:{
  type: DataTypes.INTEGER
},
place:{
  type:DataTypes.STRING()
}

}, {
  sequelize,
  modelName: 'register_inspection',
  tableName: 'register_inspection',
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
Register_inspectionModel.belongsTo(InspectionCategory, {as: 'inspection', foreignKey: 'inspection_category'})
Register_inspectionModel.belongsTo(UserModel, {as: 'User', foreignKey: 'user_id'})
Register_inspectionModel.belongsTo(RegistrationModel, {as: 'registration', foreignKey: 'doc_id'})
module.exports = Register_inspectionModel;