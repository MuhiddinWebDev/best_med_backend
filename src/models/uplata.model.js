const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const UserModel = require('./doctor_category.model');
class uplataModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

uplataModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(200)
},
price:{
  type: DataTypes.DECIMAL,
  allowNull: false
},
user_id:{
  type: DataTypes.INTEGER()
},
doctor_id:{
  type: DataTypes.INTEGER
},
type:{
  type: DataTypes.INTEGER
},
date_time:{
  type: DataTypes.STRING(),
  allowNullL: true
}

}, {
  sequelize,
  modelName: 'uplata',
  tableName: 'uplata',
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
uplataModel.belongsTo(UserModel, {as: 'users', foreignKey: 'user_id'})
module.exports = uplataModel;