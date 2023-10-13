const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const reagentModel = require('./reagent.model');
const doctorCategoryModel = require('./doctor_category.model')
class reagentDepartmentModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

reagentDepartmentModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
department_id: {
    type: DataTypes.INTEGER(),
    allowNull: false
},
reagent_id: {
  type: DataTypes.INTEGER,
  allowNull: false
},
user_id: {
  type: DataTypes.INTEGER,
  allowNull: false
},
filial_id: {
  type: DataTypes.INTEGER,
  allowNull: false
},
datetime: {
  type: DataTypes.INTEGER,
  allowNull: false
},
count:{
  type: DataTypes.DECIMAL,
  allowNull: false
}

}, {
  sequelize,
  modelName: 'reagent_department',
  tableName: 'reagent_department',
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
reagentDepartmentModel.belongsTo(reagentModel, {as: 'reagent', foreignKey: 'reagent_id'})
reagentDepartmentModel.belongsTo(doctorCategoryModel, {as:'department', foreignKey: 'department_id'})
module.exports = reagentDepartmentModel;