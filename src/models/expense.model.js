const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const filialModel = require('./filial.model');
const DoctorCategoryModel = require('./doctor_category.model');
const DoctorModel = require('./doctor.model');
class expenseModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

expenseModel.init({ 
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(300),
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'expense',
  tableName: 'expense',
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
filialModel.hasMany(DoctorCategoryModel, {as: 'doctor_category', foreignKey: 'filial_id'});
DoctorCategoryModel.hasMany(DoctorModel, {as: 'doctor', foreignKey: 'category_id'})
DoctorModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'});
module.exports = expenseModel;