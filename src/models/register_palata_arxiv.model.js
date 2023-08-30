const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class register_palata_arxivModel extends Model {
    // toJSON () {//Api da ishladi
    // var values = Object.assign({}, this.get());
    //     delete values.password_hash;
    //     return values;
    // }
}

register_palata_arxivModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 palata_id: {
   type: DataTypes.INTEGER(400)
 },
 price:{
   type: DataTypes.DECIMAL()
 },
 registration_id:{
   type: DataTypes.INTEGER,
 },
 patient_id:{
  type: DataTypes.INTEGER,
},
 day:{
  type: DataTypes.INTEGER
},
date_to:{
  type: DataTypes.INTEGER
},
date_do:{
  type: DataTypes.INTEGER
},
user_id:{
  type: DataTypes.INTEGER
},
filial_id:{
  type: DataTypes.INTEGER
}

}, {
  sequelize,
  modelName: 'register_palata_arxiv',
  tableName: 'register_palata_arxiv',
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
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "palata_id" },
      ]
    },
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "registration_id" },
      ]
    },
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "direct_id" },
      ]
    }
  ],
 
});
module.exports = register_palata_arxivModel;