const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspectionModel = require('./inspection.model');
const Inspection_categoryModel = require('./inspector_category.model');

const DoctorModel = require('./doctor.model');
const Doctor_categoryModel = require('./doctor_category.model');
class filialModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

filialModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(600),
    allowNull: false
},

}, {
  sequelize,
  modelName: 'filialModel',
  tableName: 'filial',
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
  //findOne da yoki findAll da chaqirish kerak
});
filialModel.hasMany(inspectionModel, {as: 'inspection', foreignKey: 'filial_id'});
Inspection_categoryModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'});
inspectionModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'})
filialModel.hasMany(Inspection_categoryModel, {as: 'inspection_category', foreignKey: 'filial_id'})

Doctor_categoryModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'});
// DoctorModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'})
// filialModel.hasMany(Doctor_categoryModel, {as: 'doctor_category', foreignKey: 'filial_id'})

module.exports = filialModel;