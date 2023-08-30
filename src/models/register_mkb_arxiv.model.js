const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class register_mkb_arxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

register_mkb_arxivModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
mkb_id : {
    type: DataTypes.INTEGER,
},
registration_id: {
    type: DataTypes.INTEGER(),
    allowNull: false
},
patient_id: {
  type: DataTypes.INTEGER(),
  allowNull: false
},
datetime:{
  type: DataTypes.INTEGER
},
name:{
  type: DataTypes.STRING(),
  allowNull: false
},
filial_id:{
  type: DataTypes.INTEGER
},
doctor_id:{
  type: DataTypes.INTEGER,
  allowNull: false
}



}, {
  sequelize,
  modelName: 'register_mkb_arxiv',
  tableName: 'register_mkb_arxiv',
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
module.exports = register_mkb_arxivModel;