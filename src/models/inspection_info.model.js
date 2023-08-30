const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspection_info_childModel =  require('./inspection_info_child.model')
class inspection_infoModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

inspection_infoModel.init({
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
code:{
  type:DataTypes.STRING(),
  allowNull: false
}

}, {
  sequelize,
  modelName: 'inspection_info',
  tableName: 'inspection_info',
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
inspection_infoModel.hasMany(inspection_info_childModel, {as: 'inspection_child', foreignKey: 'info_id'})
module.exports = inspection_infoModel;