const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class inspection_info_chil2dModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

inspection_info_chil2dModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
info_child_id : {
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
  modelName: 'inspection_info_child2',
  tableName: 'inspection_info_child2',
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
module.exports = inspection_info_chil2dModel;