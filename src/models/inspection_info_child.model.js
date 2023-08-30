const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspection_info_chil2dModel = require('./inspection_info_child2.model');
class inspection_info_childModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

inspection_info_childModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
info_id : {
    type: DataTypes.INTEGER,
    allowNull: false
},
name: {
    type: DataTypes.STRING(600),
    allowNull: false
},
code:{
  type:DataTypes.STRING(),
  allowNull: false
}

}, {
  sequelize,
  modelName: 'inspection_info_child',
  tableName: 'inspection_info_child',
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
inspection_info_childModel.hasMany(inspection_info_chil2dModel, {as: 'inspection_child2', foreignKey: 'info_child_id'})
module.exports = inspection_info_childModel;