const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const reagent_departmentModel = require('./reagent_department.model')
class reagentModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

reagentModel.init({
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
  modelName: 'reagent',
  tableName: 'reagent',
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
// reagentModel.hasMany(reagent_departmentModel, {as: 'reagent_department', foreignKey: 'reagent_id'})
module.exports = reagentModel;