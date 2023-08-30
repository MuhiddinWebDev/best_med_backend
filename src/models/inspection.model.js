const { DataTypes, Model } = require('sequelize');
const UserModel = require('../models/user.model')
const sequelize = require('../db/db-sequelize');
const inspectionChildModel = require('./inspectionChild.model');
const inspector_categoryModel = require('./inspector_category.model');
const filialModel = require('./filial.model');
class inspectionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

inspectionModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(200),
},
price:{
    type: DataTypes.DECIMAL
},
citizen_price:{
  type: DataTypes.DECIMAL
},
type:{
    type: DataTypes.BOOLEAN
},
user_id:{
    type: DataTypes.INTEGER
},
category_id:{
    type: DataTypes.INTEGER
},
percent_bonus:{
    type: DataTypes.INTEGER
},
filial_id:{
  type: DataTypes.INTEGER
},

}, {
  sequelize,
  modelName: 'inspection',
  tableName: 'inspection',
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
// inspectionModel.belongsTo(UserModel, {as: 'User', foreignKey: 'user_id'})
// inspectionModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'})
inspectionModel.hasMany(inspectionChildModel, {as: 'inspectionChild', foreignKey: 'parent_id'})
inspectionModel.belongsTo(inspector_categoryModel, {as: 'inspector_category', foreignKey: 'category_id'})
module.exports = inspectionModel;