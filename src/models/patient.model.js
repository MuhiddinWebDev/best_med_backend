const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const RegionModel = require('../models/region.model')
const districtModel = require('../models/district.model');
// const RegistrationModel = require('./registration.model');
class PatientModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

PatientModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
fullname:{ 
    type:DataTypes.STRING(300)
},
name: {
    type: DataTypes.STRING(300),
},
lastname: {
    type: DataTypes.STRING(300),
},
patronymic: {
    type: DataTypes.STRING(400),
},
imtiyoz_type:{
    type: DataTypes.STRING()
},
region_id: {
    type: DataTypes.INTEGER,
},
district_id: {
    type: DataTypes.INTEGER,
},
phone:{
    type:DataTypes.STRING(20)
},
passport:{
    type:DataTypes.STRING(9)
},
addres:{
    type:DataTypes.STRING
},
gender:{
    type:DataTypes.STRING(10)
},
birthday:{
    type:DataTypes.STRING
},
citizen:{
    type: DataTypes.BOOLEAN(),
    allowNull: true
},
percent:{
    type: DataTypes.DECIMAL()
}

}, {
  sequelize,
  modelName: 'patient',
  tableName: 'patient',
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
PatientModel.belongsTo(districtModel, {as: 'district', foreignKey: 'district_id'})
PatientModel.belongsTo(RegionModel, {as: 'region', foreignKey: 'region_id'})
module.exports = PatientModel;