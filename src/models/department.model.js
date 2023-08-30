const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const filialModel = require('./filial.model');
const DoctorModel = require('./doctor.model');
class departmentModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

departmentModel.init({
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
  modelName: 'department',
  tableName: 'department',
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
filialModel.hasMany(DoctorModel, {as: 'doctor', foreignKey: 'filial_id'})
module.exports = departmentModel;